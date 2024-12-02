import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import posthog from 'posthog-js';

export function CountdownPopup(props: { closePopup: () => void }) {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [username, setUsername] = useState("");
    const [isParticipating, setIsParticipating] = useState(false);

    useEffect(() => {
        const launchDate = new Date('2024-12-05T12:00:00').getTime()

        const countdownFunc = () => {
            const now = new Date().getTime()
            const distance = launchDate - now

            setCountdown({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            })

            if (distance < 0) {
                clearInterval(timer)
            }
        }
        countdownFunc()

        const timer = setInterval(countdownFunc, 1000)

        return () => clearInterval(timer)
    }, [])

    const onParticipate = () => {
        posthog.capture("Closed beta participation", { username })
        setIsParticipating(true)
    }
    
    const telegramInput = (
        <div className="space-y-4">
            <Input
                placeholder="Your telegram username"
                className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}

            />
            <Button disabled={!username} onClick={onParticipate} className="w-full bg-[#339192] hover:bg-[#41b5b6] text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                Participate in closed beta
            </Button>
        </div>
    );

    const thankYou = (
        <p className='text-center'>
            Thank You! We will contact you soon!
        </p>
    );

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={props.closePopup}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full m-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-[#339192] to-[#41b5b6] text-transparent bg-clip-text">Launching Soon</h2>
                    <p className="text-gray-300 mb-6 text-center">Smooth USDT is launching soon. For now, you can participate in closed beta!</p>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {Object.entries(countdown).map(([unit, value]) => (
                            <div key={unit} className="text-center">
                                <div className="text-3xl font-bold text-[#339192]">{value}</div>
                                <div className="text-sm text-gray-400">{unit}</div>
                            </div>
                        ))}
                    </div>
                    {isParticipating ? thankYou : telegramInput}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}