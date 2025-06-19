import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Skeleton Loader Component
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "pulse" | "wave";
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
	className, 
	variant = "pulse",
	...props 
}) => {
	return (
		<div
			className={cn(
				"rounded-md bg-muted",
				variant === "pulse" && "animate-pulse",
				variant === "wave" && "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
				className
			)}
			{...props}
		/>
	);
};

// Card Skeleton
export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
	<div className={cn("p-6 space-y-4 border rounded-lg", className)}>
		<div className="space-y-2">
			<Skeleton className="h-4 w-3/4" />
			<Skeleton className="h-4 w-1/2" />
		</div>
		<Skeleton className="h-32 w-full" />
		<div className="space-y-2">
			<Skeleton className="h-3 w-full" />
			<Skeleton className="h-3 w-2/3" />
		</div>
	</div>
);

// List Item Skeleton
export const ListItemSkeleton: React.FC<{ className?: string }> = ({ className }) => (
	<div className={cn("flex items-center space-x-4 p-4", className)}>
		<Skeleton className="h-12 w-12 rounded-full" />
		<div className="space-y-2 flex-1">
			<Skeleton className="h-4 w-1/2" />
			<Skeleton className="h-3 w-3/4" />
		</div>
		<Skeleton className="h-8 w-20" />
	</div>
);

// Table Row Skeleton
export const TableRowSkeleton: React.FC<{ columns?: number }> = ({ columns = 4 }) => (
	<tr>
		{Array.from({ length: columns }).map((_, i) => (
			<td key={i} className="p-4">
				<Skeleton className="h-4 w-full" />
			</td>
		))}
	</tr>
);

// Chart Skeleton
export const ChartSkeleton: React.FC<{ className?: string }> = ({ className }) => (
	<div className={cn("space-y-4", className)}>
		<div className="space-y-2">
			<Skeleton className="h-6 w-1/3" />
			<Skeleton className="h-4 w-1/2" />
		</div>
		<div className="flex items-end space-x-2 h-64">
			{Array.from({ length: 8 }).map((_, i) => (
				<Skeleton 
					key={i} 
					className="flex-1 animate-pulse"
					style={{ 
						height: `${Math.random() * 60 + 40}%`,
						animationDelay: `${i * 0.1}s`
					}}
				/>
			))}
		</div>
	</div>
);

// Spinner Components
interface SpinnerProps {
	size?: "sm" | "md" | "lg";
	className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = "md", className }) => {
	const sizeClasses = {
		sm: "h-4 w-4",
		md: "h-6 w-6", 
		lg: "h-8 w-8"
	};

	return (
		<Loader2 className={cn("animate-spin", sizeClasses[size], className)} />
	);
};

// Loading Button
interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	children: React.ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ 
	loading = false, 
	children, 
	disabled,
	className,
	...props 
}) => (
	<button
		className={cn(
			"inline-flex items-center justify-center gap-2 transition-all",
			className
		)}
		disabled={disabled || loading}
		{...props}
	>
		{loading && <Spinner size="sm" />}
		{children}
	</button>
);

// Loading Overlay
interface LoadingOverlayProps {
	loading: boolean;
	children: React.ReactNode;
	message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
	loading, 
	children, 
	message = "Loading..." 
}) => (
	<div className="relative">
		{children}
		{loading && (
			<div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
				<div className="text-center space-y-4">
					<Spinner size="lg" />
					<p className="text-sm text-muted-foreground">{message}</p>
				</div>
			</div>
		)}
	</div>
);

// Page Loading Component
export const PageLoading: React.FC<{ message?: string }> = ({ 
	message = "Loading page..." 
}) => (
	<div className="min-h-screen flex items-center justify-center">
		<div className="text-center space-y-6">
			<div className="relative">
				<div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
				<div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-primary/40 rounded-full animate-spin animation-delay-75 mx-auto" />
			</div>
			<div className="space-y-2">
				<h3 className="text-lg font-semibold">{message}</h3>
				<p className="text-sm text-muted-foreground">Please wait while we load your content</p>
			</div>
		</div>
	</div>
);

// Skeleton List
interface SkeletonListProps {
	count?: number;
	type?: "card" | "list" | "table";
}

export const SkeletonList: React.FC<SkeletonListProps> = ({ 
	count = 3, 
	type = "card" 
}) => {
	const SkeletonComponent = {
		card: CardSkeleton,
		list: ListItemSkeleton,
		table: () => <TableRowSkeleton />
	}[type];

	return (
		<div className="space-y-4">
			{Array.from({ length: count }).map((_, i) => (
				<div 
					key={i} 
					className={cn(
						"animate-in fade-in duration-300",
						`delay-${i * 100}ms`
					)}
				>
					<SkeletonComponent />
				</div>
			))}
		</div>
	);
};

