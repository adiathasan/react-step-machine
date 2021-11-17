import { createStore } from 'react-store-maker';

// @ts-ignore
import Animate from './animate.module.css';
import { transitions } from './StepMachine';

export interface StepState {
	activeStep: number;
	totalSteps: number;
	transitions: typeof transitions;
	activeNamedStep: string;
	classes: { [key: number]: string };
	namedSteps: { [key: number]: string };
	activatedSteps: { [key: number]: boolean };
}

export const init: StepState = {
	activeStep: 1,
	transitions: {
		enterRight: `${Animate.animated} ${Animate.fadeInRight}`,
		enterLeft: `${Animate.animated} ${Animate.fadeInLeft}`,
		exitRight: `${Animate.animated} ${Animate.fadeOutRight}`,
		exitLeft: `${Animate.animated} ${Animate.fadeOutLeft}`,
	},
	activeNamedStep: '__empty__',
	totalSteps: 0,
	classes: {},
	namedSteps: {},
	activatedSteps: {},
};

export type State = typeof init;

export type Action = Partial<State>;

const reducer = (state: State, action: Action) => {
	return {
		...state,
		...action,
	};
};

const [MachinePrivider, useStepStore, useStepDispatch] = createStore(init, reducer);

const StepPrivider: (props: any) => JSX.Element = MachinePrivider;

export { useStepStore, useStepDispatch, StepPrivider };
