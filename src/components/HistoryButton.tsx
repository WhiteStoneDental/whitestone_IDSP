import { twMerge } from 'tailwind-merge';
import { BaseButton } from './BaseButton';

export default function HistoryButton() {
    return (
        <BaseButton className={twMerge('text-blue-500')}>
            See All History
        </BaseButton>
    );
}

  