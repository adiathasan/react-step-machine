import * as React from 'react';

import { StepPrivider, useStepDispatch } from './StepMachineConfig';

// @ts-ignore
import Animate from './styles/animate.module.css';

export const transitions = {
	enterRight: `${Animate.animated} ${Animate.fadeInRight}`,
	enterLeft: `${Animate.animated} ${Animate.fadeInLeft}`,
	exitRight: `${Animate.animated} ${Animate.fadeOutRight}`,
	exitLeft: `${Animate.animated} ${Animate.fadeOutLeft}`,
};

const StepMiddleware: React.FC<StepMachineProps> = (props) => {
	const { transitions } = props;

	const dispatch = useStepDispatch();

	React.useLayoutEffect(() => {
		if (transitions) {
			dispatch({ transitions });
		}
	}, [dispatch, transitions]);

	return null;
};

export interface StepMachineProps {
	transitions?: typeof transitions;
}

const StepMachine: React.FC<StepMachineProps> = (props) => {
	return (
		<StepPrivider>
			<StepMiddleware {...props} />
			{props.children}
		</StepPrivider>
	);
};

export default StepMachine;
