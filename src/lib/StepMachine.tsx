import * as React from 'react';

import { Action, StepPrivider, useStepDispatch } from './StepMachineConfig';

// @ts-ignore
import Animate from './animate.module.css';

export const transitions = {
	enterRight: `${Animate.animated} ${Animate.fadeInRight}`,
	enterLeft: `${Animate.animated} ${Animate.fadeInLeft}`,
	exitRight: `${Animate.animated} ${Animate.fadeOutRight}`,
	exitLeft: `${Animate.animated} ${Animate.fadeOutLeft}`,
};

const StepMiddleware: React.FC<StepMachineProps> = (props) => {
	const { children, initialStep, transitions, minHeight, styles } = props;

	const dispatch = useStepDispatch();

	const deactivatedFirstStepFlag = React.useRef(true);

	React.useLayoutEffect(() => {
		const dispatableObj: Action = {};

		let couter = 0;

		React.Children.forEach(children, (child: any) => {
			const isStep = child.props.order !== undefined;

			if (isStep) {
				const order = child.props.order;

				couter++;
				dispatableObj.namedSteps = {
					...dispatableObj.namedSteps,
					[order]: child.props.name ?? `step-${order}`,
				};
			}
		});

		if (initialStep) {
			dispatableObj.activeStep = initialStep;
		}

		if (deactivatedFirstStepFlag) {
			dispatableObj.activatedSteps = {
				1: true,
			};

			deactivatedFirstStepFlag.current = false;
		}

		dispatableObj.activeNamedStep = dispatableObj.namedSteps?.[1];

		dispatableObj.totalSteps = couter;

		dispatch(dispatableObj);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (transitions) {
			dispatch({ transitions });
		}
	}, [dispatch, transitions]);

	return (
		<div
			style={{
				minHeight: minHeight ?? '50vh',
				position: 'relative',
				overflowX: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				...styles,
			}}>
			{children}
		</div>
	);
};

export interface StepMachineProps {
	children: React.ReactNode;
	initialStep?: number;
	minHeight?: string;
	transitions?: typeof transitions;
	styles?: React.CSSProperties;
}

const StepMachine: React.FC<StepMachineProps> = (props) => {
	return (
		<StepPrivider>
			<StepMiddleware {...props} />
		</StepPrivider>
	);
};

export default StepMachine;
