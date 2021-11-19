A hooks-based multistep wizard (what I call it a machine 😻) built for React which is flexible and easy to use.

Huge shout out to [jcmcneal](https://github.com/jcmcneal) for the [React Step Wizard](https://github.com/jcmcneal/react-step-wizard). I took inspiration from his work and built this library with hooks and functional components.

I felt that I had to prop drill into the step components and for accessing the props outside the wrapper I needed to write some boilerplate code. I also wanted to make it easy to get access via hooks in any place in my scope of `StepMachine`.

[![npm version](https://camo.githubusercontent.com/653d7ecca95181cebe67e326bc0500f1cf0500e1aa9af8f5130d55ffd18ef460/68747470733a2f2f62616467652e667572792e696f2f6a732f72656163742d737465702d6d616368696e652e737667)](https://badge.fury.io/js/react-step-machine)

[![What You Can Build](https://raw.githubusercontent.com/adiathasan/react-step-machine/master/machine.gif)](https://raw.githubusercontent.com/adiathasan/react-step-machine/master/machine.gif)

### [](https://www.npmjs.com/package/react-step-machine#trying-it-out)Trying It Out!

[Click here](https://adiathasan.vercel.app/react-step-machine) to see a live example! See example source code: [</>](https://github.com/adiathasan/react-step-machine/tree/master/src/lib)

### [](https://www.npmjs.com/package/react-step-machine#install)Install

```source-shell
npm install react-step-machine
----or----
yarn add react-step-machine
```

### [](https://www.npmjs.com/package/react-step-machine#import-component)Import Component

```tsx
// import StepMachine from 'react-step-machine';  (You can also import the default export and name it whatever you want)
import { StepMachine, StepContainer, Step } from 'react-step-machine';
```

### [](https://www.npmjs.com/package/react-step-machine#tsxjsx-syntax)TSX/JSX Syntax

1.  Add a wrapper with `<StepMachine></StepMachine>`.
2.  For steps add another wrapper called `<StepContainer></StepContainer>`.
3.  Add `<Step order={1}><YourComponent></Step>` to the `<StepContainer></StepContainer>` eachone will be treated as steps.
4.  Done for now!

### [](https://www.npmjs.com/package/react-step-machine#code-walk-through)Code walk through

```tsx
<StepMachine>
	<NavigationTitle />
	<NavigationPreview />

	{/* Steps  */}
	<StepContainer>
		<Step order={1} name='foo'>
			<CustomComponent />
		</Step>
		<Step order={2}>step 2</Step>
		<Step order={3}>step 3</Step>
	</StepContainer>

	{/* You will have more control with our special hooks inside components */}
	<ActionBtn />
</StepMachine>
```

### [](https://www.npmjs.com/package/react-step-machine#implementations)Implementations

Get methods and store props in the `ActionBtn/NavigationPreview/CustomComponent` with `useStepActions` & `useStepStore` hooks.

```tsx
import { StepMachine, StepContainer, Step } from 'react-step-machine';

const ActionBtn = () => {
	const {
		goToNamedStep,
		goToStep,
		firstStep,
		lastStep,
		nextStep,
		previousStep,
	} = useStepActions({
		/**
		 * On Step change you can do something here
		*/
		onStepChange: (prevStep, activeStep) => {
			console.log(prevStep, activeStep);
		},
	});

	const {activeNamedStep, totalSteps, activeStep} = useStepStore();

	return ....TO BE CONTINUED...
};
```

You have access to the following props:

```tsx
<div>
	<!-- Variables -->
	<h2>Step {activeStep}</h2>
	<h2>Step {activeNamedStep}</h2>
	<p>Total Steps: {totalSteps}</p>
	<!-- Methods -->
	<p><button onClick={previousStep}>Previous Step</button></p>
	<p><button onClick={nextStep}>Next Step</button></p>
	<p><button onClick={()=>goToStep(2)}>Step 2</button></p>
	<p><button onClick={()=>goToNamedStep("foo")}>Fooo</button></p>
	<p><button onClick={firstStep}>First Step</button></p>
	<p><button onClick={lastStep}>Last Step</button></p>
</div>
```

#### [](https://www.npmjs.com/package/react-step-machine#user-defined-props-in-stepmachine)User-Defined Props In StepMachine

| Prop        | Data Type | Default | Required | Description                                 |
| ----------- | --------- | ------- | -------- | ------------------------------------------- |
| transitions | `object`  |         | false    | CSS classes for transitioning between steps |

#### [](https://www.npmjs.com/package/react-step-machine#user-defined-props-in-stepcontainer)User-Defined Props In StepContainer

| Prop        | Data Type       | Default | Required | Description                   |
| ----------- | --------------- | ------- | -------- | ----------------------------- |
| initialStep | `integer`       | 1       | false    | The initial step to start at. |
| Style       | `CSSProperties` |         | false    | Style objects css in js.      |
| className   | `string`        |         | false    | ClassNames.                   |

#### [](https://www.npmjs.com/package/react-step-machine#user-defined-props-in-step)User-Defined Props In Step

| Prop  | Data Type | Default | Required | Description                               |
| ----- | --------- | ------- | -------- | ----------------------------------------- |
| order | `integer` |         | true     | It is required for maintaining the order. |
| name  | `string`  |         | false    | Name prop for name based navigation.      |

#### [](https://www.npmjs.com/package/react-step-machine#props-accessible-on-each-child-component-of-stepmachine-with-usestepstore-hook)Props Accessible On Each Child Component of StepMachine with `useStepStore` hook

| Prop            | Data Type | Desrciption                              |
| --------------- | --------- | ---------------------------------------- |
| classes         | `object`  | All classess being applied to each step  |
| namedSteps      | `object`  | All steps with names and orders          |
| activatedSteps  | `object`  | Steps That are activated with navigation |
| totalSteps      | `integer` | Total number of steps                    |
| activeStep      | `integer` | Step Number That is active               |
| activeNamedStep | `string`  | Step Name That is active                 |

#### [](https://www.npmjs.com/package/react-step-machine#props-accessible-on-each-child-component-of-stepmachine-with-usestepactions-hook)Props Accessible On Each Child Component of StepMachine with `useStepActions` hook

| Prop          | Data Type  | Parameters                            |
| ------------- | ---------- | ------------------------------------- |
| firstStep     | `function` | N/A                                   |
| lastStep      | `function` | N/A                                   |
| nextStep      | `function` | N/A                                   |
| previousStep  | `function` | N/A                                   |
| goToStep      | `function` | `integer` : `goToStep(3)`             |
| goToNamedStep | `function` | `string `: `goToNamedStep('contact')` |

### [](https://www.npmjs.com/package/react-step-machine#transitions)Transitions

The default transitions are using CSS taken from [animate.css](https://daneden.github.io/animate.css/). You can override the transitions by passing in custom CSS classes to the `transitions` prop in `<StepMachine>`.

```tsx
let custom = {
	enterRight: 'your custom css transition classes',
	enterLeft: 'your custom css transition classes',
	exitRight: 'your custom css transition classes',
	exitLeft: 'your custom css transition classes',
};
<StepContainer transitions={custom}>...</StepContainer>;
```

### [](https://www.npmjs.com/package/react-step-machine#initial-step)Initial Step

The order of your steps in tsx/jsx will be loaded in the same order in the browser. However, you may specify which step to start on page load by using the `initialStep` prop. It accepts a numeric value corresponding to the step order.

```tsx
<StepContainer initialStep={3}>...</StepContainer>
```

### [](https://www.npmjs.com/package/react-step-machine#use-named-steps)Use named steps

Switch steps by their names we can use `name`.

```tsx
<StepContainer>
	<BasicInfo name={'basic'} />
	<ContactInfo name={'contact'} />
	<TermsConditions /> // step-3
</StepContainer>
```
