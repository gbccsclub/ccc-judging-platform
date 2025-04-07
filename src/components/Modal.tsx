import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
    className?: string;
}

export default function Modal({
    isOpen,
    children,
    className = ""
}: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-[#00000080] z-40 h-full"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                >
                    <div className={`bg-white rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden ${className}`}>
                        <div className="p-4">
                            {children}
                        </div>
                    </div>
                </motion.div>
            </>}
        </AnimatePresence>
    );
}