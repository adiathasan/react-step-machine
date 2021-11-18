import * as React from 'react';

// @ts-ignore
import styles from './styles/styles.module.css';
import { useStep } from './hooks/useStep';

export interface StepProps {
	order: number;
	name?: string;
}

export const Step: React.FC<StepProps> = ({ children, ...rest }) => {
	const { isStepActive, transitions } = useStep(rest);

	return <div className={`${styles.step} ${transitions} ${isStepActive ? styles.active : ''}`}>{children}</div>;
};
