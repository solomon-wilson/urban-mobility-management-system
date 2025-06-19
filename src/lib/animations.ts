// Animation utilities and variants for consistent UI/UX
export const fadeInVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { 
		opacity: 1, 
		y: 0,
		transition: { duration: 0.3, ease: "easeOut" }
	}
};

export const slideInVariants = {
	hidden: { opacity: 0, x: -20 },
	visible: { 
		opacity: 1, 
		x: 0,
		transition: { duration: 0.4, ease: "easeOut" }
	}
};

export const scaleInVariants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: { 
		opacity: 1, 
		scale: 1,
		transition: { duration: 0.2, ease: "easeOut" }
	}
};

export const staggerChildrenVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2
		}
	}
};

export const cardHoverVariants = {
	rest: { scale: 1, y: 0 },
	hover: { 
		scale: 1.02, 
		y: -2,
		transition: { duration: 0.2, ease: "easeOut" }
	}
};

export const buttonTapVariants = {
	tap: { scale: 0.98, transition: { duration: 0.1 } }
};

// CSS Animation Classes
export const animationClasses = {
	// Fade animations
	fadeIn: "animate-in fade-in duration-300",
	fadeOut: "animate-out fade-out duration-200",
	
	// Slide animations
	slideInFromTop: "animate-in slide-in-from-top-2 duration-300",
	slideInFromBottom: "animate-in slide-in-from-bottom-2 duration-300",
	slideInFromLeft: "animate-in slide-in-from-left-2 duration-300",
	slideInFromRight: "animate-in slide-in-from-right-2 duration-300",
	
	// Scale animations
	scaleIn: "animate-in zoom-in-95 duration-200",
	scaleOut: "animate-out zoom-out-95 duration-200",
	
	// Bounce animation
	bounceIn: "animate-in zoom-in-50 duration-300 ease-out",
	
	// Pulse animation
	pulse: "animate-pulse",
	
	// Spin animation
	spin: "animate-spin",
};

// Transition classes for hover states
export const transitionClasses = {
	default: "transition-all duration-200 ease-in-out",
	fast: "transition-all duration-150 ease-in-out",
	slow: "transition-all duration-300 ease-in-out",
	colors: "transition-colors duration-200 ease-in-out",
	transform: "transition-transform duration-200 ease-in-out",
	shadow: "transition-shadow duration-200 ease-in-out",
};

// Loading skeleton variants
export const skeletonVariants = {
	pulse: "animate-pulse bg-muted",
	wave: "relative overflow-hidden bg-muted before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
};

// Stagger animation delays for lists
export const staggerDelays = [
	"delay-0",
	"delay-75", 
	"delay-150",
	"delay-200",
	"delay-300",
	"delay-500",
];

