"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './button'
import { MoveUp } from 'lucide-react'

const ScrollTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isVisible && (
        <Button 
          onClick={scrollToTop}
          variant="default" 
          className="rounded-full h-12 w-12 shadow-lg"
        >
            <MoveUp />
        </Button>
      )}
    </div>
  )
}

export default ScrollTopButton;