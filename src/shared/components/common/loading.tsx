import { cn } from '../../utils';

export interface LoadingProps {
  className?: string;
}

function Loading({ className }: LoadingProps) {
  return (
    <div className={cn('flexCenter size-full', className)}>
      <div className="border-primary size-10 animate-spin rounded-full border-4 border-t-transparent" />
    </div>
  );
}

export default Loading;
