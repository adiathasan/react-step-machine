import * as React from 'react';

import { useStepDispatch, Action } from './StepMachineConfig';

export interface StepCotainerProps {
	children: React.ReactNode;
	styles?: React.CSSProperties;
	initialStep?: number;
	className?: string;
}

export const StepContainer: React.FC<StepCotainerProps> = ({ children, styles, initialStep, ...rest }) => {
	const dispatch = useStepDispatch();

	React.useLayoutEffect(() => {
		const dispatchableObj: Action = {};
		let couter = 0;

		React.Children.forEach(children, (child: any) => {
			const isStep = child.props.order !== undefined;

			if (isStep) {
				const order = child.props.order;

				couter++;
				dispatchableObj.namedSteps = {
					...dispatchableObj.namedSteps,
					[order]: child.props.name ?? `step-${order}`,
				};
			}
		});

		dispatchableObj.activatedSteps = {
			1: true,
		};

		dispatchableObj.activeNamedStep = dispatchableObj.namedSteps?.[1];

		if (initialStep) {
			dispatchableObj.activeStep = initialStep;

			dispatchableObj.activatedSteps = {
				[initialStep]: true,
			};

			dispatchableObj.activeNamedStep = dispatchableObj.namedSteps?.[initialStep];
		}

		dispatchableObj.totalSteps = couter;

		dispatch(dispatchableObj);
	}, []);

	return (
		<div
			style={{
				position: 'relative',
				...styles,
			}}
			{...rest}>
			{children}
		</div>
	);
};
