import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
}

export default function Modal({
    isOpen,
    onClose,
    title,
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
                        {/* {title && (
                            <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                                <h3 className="text-lg font-serif font-medium text-gray-700">{title}</h3>
                                <button
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-gray-700 transition duration-200"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        )} */}
                        <div className="p-4">
                            {children}
                        </div>
                    </div>
                </motion.div>
            </>}
        </AnimatePresence>
    );
}