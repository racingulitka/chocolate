import { useEffect } from 'react';

function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            // Проверяем, если клик был внутри элемента, на который указывает ref
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }

            // Если клик был вне элемента, вызываем переданный handler
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}

export default useOnClickOutside;