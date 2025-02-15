'use client'

import { useState, useMemo, useEffect } from 'react';
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps } from 'react-joyride';
import { usePathname } from '@/i18n/routing';

export default function TutorialFeature() {
  const location = usePathname();
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState([]);

  const tourSteps = {
    "/candidates": [
      { target: "#sidebar-settings", content: "Welcome to the Home Page!" },
    ],
    "/settings": [
      { target: "#companyEmailConfiguration", content: "This is the About Page1." },
      { target: ".about-info", content: "Learn more about us here." }
    ],
    "/settings/companyEmailConfiguration": [
      { target: "#companyEmailConfiguration", content: "This is the About Page2." },
      { target: ".about-info", content: "Learn more about us here." }
    ],
    "/settings/setupEmailTemplateMessages": [
      { target: "#companyEmailConfiguration", content: "This is the About Page3." },
      { target: ".about-info", content: "Learn more about us here." }
    ],
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, origin, status, type } = data;

    if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
      // do something
    }

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  const handleClickStart = () => {
    setRun(true);
  };

  console.log('steps', steps);

  useEffect(() => {
    const tourSteps = {
      "/candidates": [
        { target: "#sidebar-settings", content: "Welcome to the Home Page!" },
      ],
      "/settings": [
        { target: "#companyEmailConfiguration", content: "This is the About Page1." },
        { target: ".about-info", content: "Learn more about us here." }
      ],
      "/settings/companyEmailConfiguration": [
        { target: "#companyEmailConfiguration", content: "This is the About Page2." },
        { target: ".about-info", content: "Learn more about us here." }
      ],
      "/settings/setupEmailTemplateMessages": [
        { target: "#companyEmailConfiguration", content: "This is the About Page3." },
        { target: ".about-info", content: "Learn more about us here." }
      ],
    }
    setSteps(tourSteps[location] || [])
  }, [location])

  return (
    <div>
      <Joyride run={run} steps={steps} continuous
               showSkipButton
               showProgress
               callback={(data) => {
                 if (data.status === "finished" || data.status === "skipped") {
                   setRun(false); // Stop the tour after completion
                 }
               }} />
      <button onClick={handleClickStart}>Start</button>
    </div>
  );
}