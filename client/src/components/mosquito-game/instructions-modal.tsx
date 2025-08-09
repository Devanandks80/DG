interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: () => void;
}

export function InstructionsModal({ isOpen, onClose, onStartGame }: InstructionsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="border rounded-xl p-8 max-w-lg mx-4 relative"
           style={{
             backgroundColor: 'hsl(0, 0%, 10.2%)',
             borderColor: 'rgba(74, 74, 74, 0.3)'
           }}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <h2 className="font-orbitron font-bold text-2xl mb-6" style={{ color: 'hsl(48, 84.62%, 58.82%)' }}>
          How to Play
        </h2>
        
        <div className="space-y-4 text-sm leading-relaxed">
          <div className="p-4 rounded-lg border"
               style={{
                 backgroundColor: 'rgba(15, 15, 15, 0.5)',
                 borderColor: 'rgba(74, 74, 74, 0.2)'
               }}>
            <h3 className="font-orbitron font-bold mb-2" style={{ color: 'hsl(48, 84.62%, 58.82%)' }}>
              Objective
            </h3>
            <p className="text-gray-300">
              Watch mosquitoes fly around your screen and interact with them. The goal is to create as many mosquitoes as possible!
            </p>
          </div>
          
          <div className="p-4 rounded-lg border"
               style={{
                 backgroundColor: 'rgba(15, 15, 15, 0.5)',
                 borderColor: 'rgba(74, 74, 74, 0.2)'
               }}>
            <h3 className="font-orbitron font-bold mb-2" style={{ color: 'hsl(48, 84.62%, 58.82%)' }}>
              Interactions
            </h3>
            <ul className="text-gray-300 space-y-1">
              <li>• <strong>Click</strong> a mosquito to make it multiply</li>
              <li>• Mosquitoes will <strong>follow your cursor</strong> when you get close</li>
              <li>• Each click spawns additional mosquitoes</li>
              <li>• Use the speed slider to control movement speed</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-lg border"
               style={{
                 backgroundColor: 'rgba(15, 15, 15, 0.5)',
                 borderColor: 'rgba(74, 74, 74, 0.2)'
               }}>
            <h3 className="font-orbitron font-bold mb-2" style={{ color: 'hsl(48, 84.62%, 58.82%)' }}>
              Tips
            </h3>
            <ul className="text-gray-300 space-y-1">
              <li>• Watch the performance monitor to avoid lag</li>
              <li>• Use the reset button to start over</li>
              <li>• Toggle sound effects on/off as needed</li>
            </ul>
          </div>
        </div>
        
        <button 
          onClick={onStartGame}
          className="w-full mt-6 px-4 py-3 rounded-lg font-orbitron font-bold transition-colors duration-200 border"
          style={{
            backgroundColor: 'hsl(120, 23.68%, 23.14%)',
            color: 'hsl(48, 84.62%, 58.82%)',
            borderColor: 'rgba(74, 74, 74, 0.3)'
          }}>
          Start Playing
        </button>
      </div>
    </div>
  );
}
