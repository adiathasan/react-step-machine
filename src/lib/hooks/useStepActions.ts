import * as React from 'react';

import { useStepStore, useStepDispatch } from '../StepMachineConfig';

export interface StepActionProps {
	onStepChangeCb?: (prevStep: number, activeStep: number) => void;
}

export const useStepActions = (props?: StepActionProps) => {
	const { activeStep, totalSteps, classes, namedSteps, activatedSteps, transitions } = useStepStore();

	const dispatch = useStepDispatch();

	const onStepChangeCbRef = React.useRef(props?.onStepChangeCb);

	onStepChangeCbRef.current = props?.onStepChangeCb;

	const isInvalidStep = React.useCallback((next: number) => next < 1 || next > totalSteps, [totalSteps]);

	const setActiveStep = React.useCallback(
		(next: number) => {
			if (activeStep === next) return;

			if (isInvalidStep(next)) return;

			const classesCopy = { ...classes };

			if (activeStep < next) {
				classesCopy[activeStep] = transitions.exitLeft;
				classesCopy[next] = transitions.enterRight;
			} else {
				classesCopy[activeStep] = transitions.exitRight;
				classesCopy[next] = transitions.enterLeft;
			}

			dispatch({
				classes: classesCopy,
				activeStep: next,
				activatedSteps: { ...activatedSteps, [next]: true },
				activeNamedStep: namedSteps[next],
			});

			onStepChangeCbRef.current?.(activeStep + 1, next + 1);
		},
		[activatedSteps, activeStep, classes, dispatch, isInvalidStep, namedSteps, transitions]
	);

	const goToNamedStep = React.useCallback(
		(name: string) => {
			if (!namedSteps[name]) return;

			const next = namedSteps[name];

			setActiveStep(next);
		},
		[namedSteps, setActiveStep]
	);

	const goToStep = React.useCallback((order: number) => setActiveStep(order), [setActiveStep]);

	const firstStep = React.useCallback(() => setActiveStep(1), [setActiveStep]);

	const lastStep = React.useCallback(() => setActiveStep(totalSteps), [totalSteps, setActiveStep]);

	const nextStep = React.useCallback(() => setActiveStep(activeStep + 1), [activeStep, setActiveStep]);

	const previousStep = React.useCallback(() => setActiveStep(activeStep - 1), [setActiveStep, activeStep]);

	return {
		goToNamedStep,
		goToStep,
		firstStep,
		lastStep,
		nextStep,
		previousStep,
	};
};
