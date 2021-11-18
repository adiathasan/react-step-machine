import * as React from 'react';

import { StepProps } from '../Step';
import { useStepStore } from '../StepMachineConfig';

export const useStep = (props: StepProps) => {
	const { activeStep, classes } = useStepStore();

	const isStepActive = React.useMemo(() => activeStep === props.order, [activeStep, props.order]);

	const transitions = React.useMemo(() => classes[props.order], [classes, props.order]);

	return { isStepActive, transitions };
};
