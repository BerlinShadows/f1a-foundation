// 'use client';

// import { useEffect, useState } from 'react';
// import Card from '@/components/ui/Card';
// import Button from '@/components/ui/Button';
// import VisualFocusContainer from '@/components/animations/VisualFocusContainer';
// import Table from '@/components/ui/Table';
// import PlayerNameSetup from '@/components/ui/PlayerNameSetup';

// const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

// export default function DiceGamePage() {
//     const [isRolling, setIsRolling] = useState(false);
//     const [playerName, setPlayerName] = useState<string | null>(null);
//     const [dice, setDice] = useState<[number, number]>([1, 1]);


//     const [history, setHistory] = useState<{ sum: number; player: string }[]>([]);
//     const [stats, setStats] = useState({
//         total: 0,
//         even: 0,
//         odd: 0,
//     });
//     useEffect(() => {
//         const saved = localStorage.getItem('dice-stats');
//         if (saved) setStats(JSON.parse(saved));
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('dice-stats', JSON.stringify(stats));
//     }, [stats]);


//     if (!playerName) {
//         return <PlayerNameSetup onReady={setPlayerName} />;
//     }

//     const rollDice = () => {
//         if (isRolling) return;

//         setIsRolling(true);
//         setDice([1, 1]);

//         setTimeout(() => {
//             const die1 = Math.floor(Math.random() * 6) + 1;
//             const die2 = Math.floor(Math.random() * 6) + 1;
//             const sum = die1 + die2;
//             const isEven = sum % 2 === 0;

//             setDice([die1, die2]);
//             setIsRolling(false);
//             setHistory(prev => [{ sum, player: playerName }, ...prev.slice(0, 4)]);

//             setStats(prev => ({
//                 total: prev.total + 1,
//                 even: isEven ? prev.even + 1 : prev.even,
//                 odd: !isEven ? prev.odd + 1 : prev.odd,
//             }));
//         }, 1500);
//     };



//     const sum = dice[0] + dice[1];
//     const isEven = sum % 2 === 0;


//     return (
//         <div style={{ margin: '0 auto' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
//                 <h1 style={{
//                     fontSize: '2.5rem',
//                     fontWeight: 'bold',
//                     color: 'var(--text-primary)',
//                     textShadow: 'var(--text-shadow)',
//                 }}>
//                     Roll Dice
//                 </h1>
//             </div>

//             <div style={{
//                 display: 'flex',
//                 gap: '1.25rem',
//                 flexWrap: 'wrap',
//                 justifyContent: 'center',
//             }}>
//                 {[
//                     { label: 'Всего', value: stats.total, color: 'var(--text-primary)' },
//                     { label: 'Чёт', value: stats.even, color: 'var(--accent)' },
//                     { label: 'Нечёт', value: stats.odd, color: '#6366f1' },
//                 ].map((item, i) => (
//                     <div key={i} style={{
//                         background: 'var(--card-bg)',
//                         padding: '0.75rem 1.25rem',
//                         borderRadius: '12px',
//                         border: '1px solid var(--border)',
//                         minWidth: '90px',
//                     }}>
//                         <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.label}</div>
//                         <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: item.color }}>
//                             {item.value}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 marginBottom: '2rem',
//                 overflow: 'hidden',
//                 padding: '1rem 0',
//             }}>
//                 <VisualFocusContainer isActive={true}>
//                     <div style={{ display: 'flex', gap: '2rem' }}>
//                         {dice.map((value, index) => (
//                             <div
//                                 key={index}
//                                 style={{
//                                     width: '100px',
//                                     height: '100px',
//                                     background: 'var(--dice)',
//                                     borderRadius: '12px',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     fontSize: '2.5rem',
//                                     fontWeight: 'bold',
//                                     color: 'var(--dice)',
//                                     boxShadow: 'var(--shadow-md)',
//                                     transform: isRolling
//                                         ? 'rotate(3600deg) scale(1.1)'
//                                         : 'rotate(0deg) scale(1)',
//                                     transition: isRolling
//                                         ? 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
//                                         : 'transform 0.3s ease',
//                                     border: 'var(--dice-border)'
//                                 }}
//                             >
//                                 {DICE_FACES[value - 1]}
//                             </div>
//                         ))}
//                     </div>
//                 </VisualFocusContainer>
//             </div>

//             <div style={{ marginBottom: '3rem' }}>
//                 <Button
//                     onClick={rollDice}
//                     disabled={isRolling}
//                     variant="primary"
//                 >
//                     {isRolling ? 'Бросаю...' : 'Бросить кубики'}
//                 </Button>
//             </div>

//             <Card style={{
//                 marginBottom: '3rem',
//                 background: 'var(--card-bg)',
//                 border: '1px solid var(--border)',
//                 borderRadius: '12px',
//                 padding: '1.25rem',
//                 width: '100%',
//                 maxWidth: '400px',
//             }}>
//                 <h3 style={{
//                     fontSize: '1.25rem',
//                     fontWeight: 'bold',
//                     color: 'var(--text-primary)',
//                     margin: '0 0 1rem',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '0.5rem',
//                 }}>
//                     Командное состязание
//                 </h3>
//                 <div style={{
//                     display: 'flex',
//                     justifyContent: 'space-around',
//                     gap: '1rem',
//                 }}>
//                     <div style={{ textAlign: 'center' }}>
//                         <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Чёт</div>
//                         <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
//                             {stats.even}
//                         </div>
//                         <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>побед</div>
//                     </div>
//                     <div style={{
//                         alignSelf: 'center',
//                         fontSize: '1.5rem',
//                         fontWeight: 'bold',
//                         color: 'var(--text-secondary)',
//                     }}>
//                         vs
//                     </div>
//                     <div style={{ textAlign: 'center' }}>
//                         <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Нечёт</div>
//                         <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6366f1' }}>
//                             {stats.odd}
//                         </div>
//                         <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>побед</div>
//                     </div>
//                 </div>
//             </Card>

//             {history.length > 0 && (
//                 <Card title='Последние суммы:'>
//                     <Table
//                         pageSize={5}
//                         headers={['Сумма', 'Игрок']}
//                         rows={history.map(item => [item.sum.toString(), item.player])}
//                     />
//                 </Card>
//             )}

//             {sum > 0 && !isRolling && (
//                 <div
//                     style={{
//                         marginTop: '1rem',
//                         fontSize: '1.2rem',
//                         fontWeight: 'bold',
//                         color: isEven ? 'var(--accent)' : '#6366f1',
//                         textAlign: 'center',
//                     }}
//                 >
//                     Сумма: <strong>{sum}</strong> — {isEven ? 'чётная' : 'нечётная'}!

//                 </div>
//             )}

//         </div>

//     );
// }