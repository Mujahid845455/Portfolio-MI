'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  IconCommand,
  IconOption,
  IconArrowUp,
  IconChevronDown,
  IconChevronUp,
  IconBrightnessDown,
  IconBrightnessUp,
  IconWorld,
  IconSearch,
  IconMicrophone,
  IconMoon,
  IconPlayerTrackPrev,
  IconPlayerPlay,
  IconPlayerTrackNext,
  IconVolume3,
  IconVolume2,
  IconVolume,
} from '@tabler/icons-react';
import Image from 'next/image';

interface MacbookScrollProps {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}

export const MacbookScroll = ({
  src,
  showGradient = false,
  title,
  badge,
  children,
}: MacbookScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, 1]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, 1]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const rotate = useTransform(
    scrollYProgress,
    [0.05, 0.25],
    [-25, 0]
  );
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={ref}
      className="min-h-[130vh] flex flex-col items-center py-0 md:py-8 justify-start shrink-0 [perspective:800px] transform md:scale-100 scale-90 relative overflow-hidden"
    >
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="text-white text-3xl md:text-5xl font-bold text-center mb-20 tracking-tight"
      >
        {title || (
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        )}
      </motion.h2>

      {/* Lid */}
      <Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      >
        {children}
      </Lid>

      {/* Base */}
      <div className="h-[22rem] w-[32rem] bg-[#272729] rounded-2xl overflow-hidden relative font-sans -mt-4 shadow-2xl">
        {/* above keyboard bar */}
        <div className="h-10 w-full relative border-b border-[#313133]">
          {/* speaker grills */}
          <div className="absolute inset-x-0 mx-auto w-[80%] h-full flex items-center justify-between">
            <SpeakerGrid />
            <SpeakerGrid />
          </div>
        </div>
        {/* keyboard */}
        <Keypad />
        {/* trackpad */}
        <Trackpad />
        {/* lip */}
        <div className="h-2 w-20 mx-auto inset-x-0 absolute bottom-0 bg-[#313133] rounded-t-sm" />
      </div>

      {badge && <div className="absolute right-4 top-20 z-40">{badge}</div>}
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
  children,
}: {
  scaleX: any;
  scaleY: any;
  rotate: any;
  translate: any;
  src?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="relative [perspective:1000px] z-20 flex justify-center">
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformOrigin: 'bottom center',
          transformStyle: 'preserve-3d',
        }}
        className="h-[18.5rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative shadow-2xl border border-white/10"
      >
        <div
          style={{
            boxShadow: '0px 0px 1px 1px #000000 inset',
          }}
          className="absolute inset-0 bg-[#272729] rounded-[#121212] flex flex-col justify-between items-center font-sans text-white text-[10px]"
        >
          {/* notch */}
          <div className="w-[10%] h-2 bg-[#121212] rounded-b-md mx-auto z-30" />

          {/* Animated Pop-Out Screen Content */}
          <div className="flex-1 w-full p-2 relative">
            <div className="w-full h-full bg-[#05070e] rounded-lg overflow-hidden relative border border-[#1f293d] shadow-2xl">
              {src ? (
                <Image
                  src={src}
                  alt="macbook screen"
                  fill
                  className="object-cover object-left-top"
                  priority
                />
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div className="w-40 h-24 mx-auto my-1 rounded-xl bg-[#141419] border border-[#22222b] shadow-inner" />
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="flex flex-col gap-0.5 justify-center py-2 px-1"
      style={{
        backgroundImage:
          'radial-gradient(circle, #3a3a45 0.5px, transparent 0.5px)',
        backgroundSize: '3px 3px',
        width: '28px',
      }}
    />
  );
};

export const Keypad = () => {
  return (
    <div className="h-full rounded-md bg-[#0a0a0d] p-1.5 border border-[#1a1a24] shadow-md flex-1 mx-2 my-1">
      {/* Row 1 */}
      <Row className="mb-0.5">
        <Kbd className="w-6 text-[8px]">esc</Kbd>
        <Kbd className="w-5 text-[8px]"><IconBrightnessDown size={10} /></Kbd>
        <Kbd className="w-5 text-[8px]"><IconBrightnessUp size={10} /></Kbd>
        <Kbd className="w-5 text-[8px]"><IconWorld size={10} /></Kbd>
        <Kbd className="w-5 text-[8px]"><IconSearch size={10} /></Kbd>
        <Kbd className="w-5 text-[8px]"><IconMicrophone size={10} /></Kbd>
        <Kbd className="w-5 text-[8px]"><IconMoon size={10} /></Kbd>
        <Kbd className="w-5 text-[8px]"><IconPlayerTrackPrev size={10} /></Kbd>
        <Kbd className="w-5 text-[8px]"><IconPlayerPlay size={10} /></Kbd>
        <Kbd className="w-5 text-[8px]"><IconPlayerTrackNext size={10} /></Kbd>
        <Kbd className="w-5 text-[8px]"><IconVolume3 size={10} /></Kbd>
        <Kbd className="w-5 text-[8px]"><IconVolume2 size={10} /></Kbd>
        <Kbd className="w-5 text-[8px]"><IconVolume size={10} /></Kbd>
        <Kbd className="w-6 text-[8px] rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 border border-gray-600" />
      </Row>

      {/* Row 2 */}
      <Row className="mb-0.5">
        <Kbd className="w-5 text-[9px]">~</Kbd>
        <Kbd className="w-5 text-[9px]">1</Kbd>
        <Kbd className="w-5 text-[9px]">2</Kbd>
        <Kbd className="w-5 text-[9px]">3</Kbd>
        <Kbd className="w-5 text-[9px]">4</Kbd>
        <Kbd className="w-5 text-[9px]">5</Kbd>
        <Kbd className="w-5 text-[9px]">6</Kbd>
        <Kbd className="w-5 text-[9px]">7</Kbd>
        <Kbd className="w-5 text-[9px]">8</Kbd>
        <Kbd className="w-5 text-[9px]">9</Kbd>
        <Kbd className="w-5 text-[9px]">0</Kbd>
        <Kbd className="w-5 text-[9px]">-</Kbd>
        <Kbd className="w-5 text-[9px]">=</Kbd>
        <Kbd className="w-8 text-[8px]">delete</Kbd>
      </Row>

      {/* Row 3 */}
      <Row className="mb-0.5">
        <Kbd className="w-8 text-[8px]">tab</Kbd>
        <Kbd className="w-5 text-[9px]">Q</Kbd>
        <Kbd className="w-5 text-[9px]">W</Kbd>
        <Kbd className="w-5 text-[9px]">E</Kbd>
        <Kbd className="w-5 text-[9px]">R</Kbd>
        <Kbd className="w-5 text-[9px]">T</Kbd>
        <Kbd className="w-5 text-[9px]">Y</Kbd>
        <Kbd className="w-5 text-[9px]">U</Kbd>
        <Kbd className="w-5 text-[9px]">I</Kbd>
        <Kbd className="w-5 text-[9px]">O</Kbd>
        <Kbd className="w-5 text-[9px]">P</Kbd>
        <Kbd className="w-5 text-[9px]">[</Kbd>
        <Kbd className="w-5 text-[9px]">]</Kbd>
        <Kbd className="w-5 text-[9px]">\</Kbd>
      </Row>

      {/* Row 4 */}
      <Row className="mb-0.5">
        <Kbd className="w-10 text-[8px]">caps lock</Kbd>
        <Kbd className="w-5 text-[9px]">A</Kbd>
        <Kbd className="w-5 text-[9px]">S</Kbd>
        <Kbd className="w-5 text-[9px]">D</Kbd>
        <Kbd className="w-5 text-[9px]">F</Kbd>
        <Kbd className="w-5 text-[9px]">G</Kbd>
        <Kbd className="w-5 text-[9px]">H</Kbd>
        <Kbd className="w-5 text-[9px]">J</Kbd>
        <Kbd className="w-5 text-[9px]">K</Kbd>
        <Kbd className="w-5 text-[9px]">L</Kbd>
        <Kbd className="w-5 text-[9px];">;</Kbd>
        <Kbd className="w-5 text-[9px]">&apos;</Kbd>
        <Kbd className="w-10 text-[8px]">return</Kbd>
      </Row>

      {/* Row 5 */}
      <Row className="mb-0.5">
        <Kbd className="w-12 text-[8px] flex justify-between px-1"><span>shift</span><IconArrowUp size={8} /></Kbd>
        <Kbd className="w-5 text-[9px]">Z</Kbd>
        <Kbd className="w-5 text-[9px]">X</Kbd>
        <Kbd className="w-5 text-[9px]">C</Kbd>
        <Kbd className="w-5 text-[9px]">V</Kbd>
        <Kbd className="w-5 text-[9px]">B</Kbd>
        <Kbd className="w-5 text-[9px]">N</Kbd>
        <Kbd className="w-5 text-[9px]">M</Kbd>
        <Kbd className="w-5 text-[9px]">,</Kbd>
        <Kbd className="w-5 text-[9px]">.</Kbd>
        <Kbd className="w-5 text-[9px]">/</Kbd>
        <Kbd className="w-12 text-[8px] flex justify-between px-1"><IconArrowUp size={8} /><span>shift</span></Kbd>
      </Row>

      {/* Row 6 */}
      <Row>
        <Kbd className="w-6 text-[7px]">fn</Kbd>
        <Kbd className="w-6 text-[7px]">control</Kbd>
        <Kbd className="w-6 text-[7px] flex justify-between px-0.5"><span>opt</span><IconOption size={8} /></Kbd>
        <Kbd className="w-8 text-[7px] flex justify-between px-0.5"><span>cmd</span><IconCommand size={8} /></Kbd>
        <Kbd className="w-28" />
        <Kbd className="w-8 text-[7px] flex justify-between px-0.5"><span>cmd</span><IconCommand size={8} /></Kbd>
        <Kbd className="w-6 text-[7px] flex justify-between px-0.5"><span>opt</span><IconOption size={8} /></Kbd>
        <div className="flex flex-col gap-0.5">
          <Kbd className="w-4 h-2 text-[6px] flex items-center justify-center"><IconChevronUp size={7} /></Kbd>
          <Kbd className="w-4 h-2 text-[6px] flex items-center justify-center"><IconChevronDown size={7} /></Kbd>
        </div>
      </Row>
    </div>
  );
};

export const Row = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex items-center justify-between gap-0.5 ${className || ''}`}>
      {children}
    </div>
  );
};

export const Kbd = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`h-4.5 rounded-[3px] bg-[#16161f] hover:bg-[#20202c] border border-[#252535] text-gray-400 font-mono flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.8)] select-none transition-colors ${
        className || ''
      }`}
    >
      {children}
    </div>
  );
};
