export interface Vector2D {
  x: number;
  y: number;
}

export interface Mosquito {
  id: string;
  position: Vector2D;
  velocity: Vector2D;
  acceleration: Vector2D;
  angle: number;
  size: number;
  wingBeat: number;
  followCursor: boolean;
  targetPosition?: Vector2D;
  timeAlive: number;
}

export class MosquitoEngine {
  private mosquitoes: Map<string, Mosquito> = new Map();
  private mousePosition: Vector2D = { x: 0, y: 0 };
  private canvasWidth: number = 0;
  private canvasHeight: number = 0;
  private speedMultiplier: number = 1;
  private followRadius: number = 100;
  private maxSpeed: number = 2;
  private generation: number = 0;

  constructor(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
  }

  setCanvasSize(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
  }

  setMousePosition(x: number, y: number) {
    this.mousePosition = { x, y };
  }

  setSpeedMultiplier(speed: number) {
    this.speedMultiplier = speed;
  }

  createMosquito(x?: number, y?: number): Mosquito {
    const mosquito: Mosquito = {
      id: `mosquito_${Date.now()}_${Math.random()}`,
      position: {
        x: x ?? Math.random() * this.canvasWidth,
        y: y ?? Math.random() * this.canvasHeight
      },
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      },
      acceleration: { x: 0, y: 0 },
      angle: Math.random() * Math.PI * 2,
      size: 3 + Math.random() * 2,
      wingBeat: 0,
      followCursor: false,
      timeAlive: 0
    };

    this.mosquitoes.set(mosquito.id, mosquito);
    return mosquito;
  }

  removeMosquito(id: string) {
    this.mosquitoes.delete(id);
  }

  clearAll() {
    this.mosquitoes.clear();
  }

  getMosquitoes(): Mosquito[] {
    return Array.from(this.mosquitoes.values());
  }

  getCount(): number {
    return this.mosquitoes.size;
  }

  checkClick(clickX: number, clickY: number): Mosquito[] {
    const clickedMosquitoes: Mosquito[] = [];
    
    this.mosquitoes.forEach(mosquito => {
      const distance = Math.sqrt(
        (clickX - mosquito.position.x) ** 2 + 
        (clickY - mosquito.position.y) ** 2
      );
      
      if (distance < mosquito.size + 10) {
        clickedMosquitoes.push(mosquito);
      }
    });
    
    return clickedMosquitoes;
  }

  multiplyMosquito(mosquito: Mosquito, count: number = 2): Mosquito[] {
    const newMosquitoes: Mosquito[] = [];
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const distance = 20;
      const newX = mosquito.position.x + Math.cos(angle) * distance;
      const newY = mosquito.position.y + Math.sin(angle) * distance;
      
      const newMosquito = this.createMosquito(
        Math.max(10, Math.min(this.canvasWidth - 10, newX)),
        Math.max(10, Math.min(this.canvasHeight - 10, newY))
      );
      
      newMosquitoes.push(newMosquito);
    }
    
    return newMosquitoes;
  }

  update(deltaTime: number) {
    this.mosquitoes.forEach(mosquito => {
      this.updateMosquito(mosquito, deltaTime);
    });
  }

  private updateMosquito(mosquito: Mosquito, deltaTime: number) {
    mosquito.timeAlive += deltaTime;
    mosquito.wingBeat += deltaTime * 20;

    // Check if should follow cursor
    const distanceToMouse = Math.sqrt(
      (this.mousePosition.x - mosquito.position.x) ** 2 +
      (this.mousePosition.y - mosquito.position.y) ** 2
    );

    mosquito.followCursor = distanceToMouse < this.followRadius;

    // Reset acceleration
    mosquito.acceleration = { x: 0, y: 0 };

    if (mosquito.followCursor) {
      // Follow cursor behavior
      const directionX = this.mousePosition.x - mosquito.position.x;
      const directionY = this.mousePosition.y - mosquito.position.y;
      const distance = Math.sqrt(directionX ** 2 + directionY ** 2);

      if (distance > 0) {
        const force = 0.5;
        mosquito.acceleration.x += (directionX / distance) * force;
        mosquito.acceleration.y += (directionY / distance) * force;
      }
    } else {
      // Random erratic movement
      const noiseStrength = 0.3;
      mosquito.acceleration.x += (Math.random() - 0.5) * noiseStrength;
      mosquito.acceleration.y += (Math.random() - 0.5) * noiseStrength;

      // Slight attraction to center to prevent mosquitoes from flying away
      const centerX = this.canvasWidth / 2;
      const centerY = this.canvasHeight / 2;
      const toCenterX = centerX - mosquito.position.x;
      const toCenterY = centerY - mosquito.position.y;
      const centerDistance = Math.sqrt(toCenterX ** 2 + toCenterY ** 2);
      
      if (centerDistance > 0) {
        const centerForce = 0.05;
        mosquito.acceleration.x += (toCenterX / centerDistance) * centerForce;
        mosquito.acceleration.y += (toCenterY / centerDistance) * centerForce;
      }
    }

    // Update velocity with acceleration
    mosquito.velocity.x += mosquito.acceleration.x * deltaTime * this.speedMultiplier;
    mosquito.velocity.y += mosquito.acceleration.y * deltaTime * this.speedMultiplier;

    // Limit max speed
    const speed = Math.sqrt(mosquito.velocity.x ** 2 + mosquito.velocity.y ** 2);
    if (speed > this.maxSpeed * this.speedMultiplier) {
      mosquito.velocity.x = (mosquito.velocity.x / speed) * this.maxSpeed * this.speedMultiplier;
      mosquito.velocity.y = (mosquito.velocity.y / speed) * this.maxSpeed * this.speedMultiplier;
    }

    // Update position
    mosquito.position.x += mosquito.velocity.x * deltaTime * 60;
    mosquito.position.y += mosquito.velocity.y * deltaTime * 60;

    // Boundary collision with slight bounce
    if (mosquito.position.x < 0) {
      mosquito.position.x = 0;
      mosquito.velocity.x = Math.abs(mosquito.velocity.x) * 0.8;
    }
    if (mosquito.position.x > this.canvasWidth) {
      mosquito.position.x = this.canvasWidth;
      mosquito.velocity.x = -Math.abs(mosquito.velocity.x) * 0.8;
    }
    if (mosquito.position.y < 0) {
      mosquito.position.y = 0;
      mosquito.velocity.y = Math.abs(mosquito.velocity.y) * 0.8;
    }
    if (mosquito.position.y > this.canvasHeight) {
      mosquito.position.y = this.canvasHeight;
      mosquito.velocity.y = -Math.abs(mosquito.velocity.y) * 0.8;
    }

    // Update angle based on velocity
    if (mosquito.velocity.x !== 0 || mosquito.velocity.y !== 0) {
      mosquito.angle = Math.atan2(mosquito.velocity.y, mosquito.velocity.x);
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    this.mosquitoes.forEach(mosquito => {
      this.renderMosquito(ctx, mosquito);
    });
  }

  private renderMosquito(ctx: CanvasRenderingContext2D, mosquito: Mosquito) {
    ctx.save();
    ctx.translate(mosquito.position.x, mosquito.position.y);
    ctx.rotate(mosquito.angle);

    // Body
    ctx.fillStyle = '#333333';
    ctx.fillRect(-mosquito.size, -mosquito.size * 0.3, mosquito.size * 2, mosquito.size * 0.6);

    // Wings
    const wingFlap = Math.sin(mosquito.wingBeat) * 0.5;
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1;
    
    // Left wing
    ctx.beginPath();
    ctx.ellipse(-mosquito.size * 0.5, -mosquito.size * 0.5 + wingFlap, 
                mosquito.size * 0.8, mosquito.size * 0.4, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    // Right wing
    ctx.beginPath();
    ctx.ellipse(-mosquito.size * 0.5, mosquito.size * 0.5 - wingFlap, 
                mosquito.size * 0.8, mosquito.size * 0.4, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Head
    ctx.fillStyle = '#444444';
    ctx.beginPath();
    ctx.arc(mosquito.size * 0.8, 0, mosquito.size * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Proboscis
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(mosquito.size * 1.1, 0);
    ctx.lineTo(mosquito.size * 1.5, 0);
    ctx.stroke();

    ctx.restore();
  }
}
