'use client'

import { useState, useEffect } from 'react';
import Joyride, { EVENTS } from 'react-joyride';
import { useRouter, usePathname } from '@/i18n/routing';

export default function TutorialFeature() {
  const location = usePathname()
  const router = useRouter();
  const [steps, setSteps] = useState([]);
  const [run, setRun] = useState(false);
  const [locations , setLocations] = useState([]);

  useEffect(() => {
    const tourSteps = {
      "/candidates": [
        { target: "#sidebar-settings", content: "Welcome to the Home Page!" },
        { target: "#elementDoesNotExist", content: "" },
      ],
      "/settings": [
        { target: "#companyEmailConfiguration", content: "This is the About Page1." },
        { target: "#elementDoesNotExist", content: "" },
      ],
      "/settings/companyEmailConfiguration": [
        { target: "#form", content: "Form" },
        { target: "#setupEmailTemplateMessages", content: "This is the About Page3." },
        { target: "#elementDoesNotExist", content: "" },
      ],
      "/settings/setupEmailTemplateMessages": [
        { target: "#textEditorMainToolbar", content: "This is the About Page3." },
        { target: "#textEditorToolbar", content: "This is the About Page3." },
        { target: "#editor", content: "This is the About Page3." },
        { target: "#preview", content: "This is the About Page3." },
        { target: "#overviewEmailTemplateMessages", content: "This is the About Page3." },
        { target: "#elementDoesNotExist", content: "" },
      ],
      "/settings/overviewEmailTemplateMessages": [
        { target: "#overviewEmailTemplateMessages", content: "This is the About Page3." },
        { target: "#mapTemplateMessages", content: "This is the About Page3." },
        { target: "#elementDoesNotExist", content: "" },
      ],
      "/settings/mapTemplateMessages": [
        { target: "#mapEmailTemplateMessages", content: "This is the About Page3." },
        { target: "#form", content: "" },
        { target: "#elementDoesNotExist", content: "" },
      ],
    }
    setSteps(tourSteps[location] || [])
  }, [location, run])

  useEffect(() => {
    const startTutorialButton = document.getElementById('startTutorial');
    if (!locations.includes(location) && location !== '/login' && startTutorialButton) {
      console.log('ieuiuiutieurtieutieutiutieutieutieutieutieutieutieutiuetieut');
      startTutorialButton.click();
      setLocations([...locations, location]);
    }
  }, [location, locations, steps]);

  useEffect(() => {
      const hasSeenTour = localStorage.getItem('hasSeenTour');
      if (!hasSeenTour) {
        setRun(true);
      } else {
        setRun(false);
      }
    }, []);

  return (
    <div>
      <Joyride
        steps={steps}
        run={run}
        continuous
        scrollToFirstStep
        showSkipButton
        callback={(data) => {
          const { status } = data;
          const finishedStatuses = ['finished', 'skipped']
          console.log('data', data)
          if (data.type === EVENTS.TARGET_NOT_FOUND && location === '/candidates') {
            router.push("/settings")
          }
          if (data.type === EVENTS.TARGET_NOT_FOUND && location === '/settings') {
            router.push("/settings/companyEmailConfiguration")
          }
          if (data.type === EVENTS.TARGET_NOT_FOUND && location === '/settings/companyEmailConfiguration') {
            router.push("/settings/setupEmailTemplateMessages")
          }
          if (data.type === EVENTS.TARGET_NOT_FOUND && location === '/settings/setupEmailTemplateMessages') {
            router.push("/settings/overviewEmailTemplateMessages")
          }
          if (data.type === EVENTS.TARGET_NOT_FOUND && location === '/settings/overviewEmailTemplateMessages') {
            router.push("/settings/mapTemplateMessages")
          }
          if (data.type === EVENTS.TARGET_NOT_FOUND && location === '/settings/mapTemplateMessages') {
            router.push("/candidates")
            localStorage.setItem('hasSeenTour', 'true');
            setRun(false);
          }
          if (finishedStatuses.includes(status)) {
            localStorage.setItem('hasSeenTour', 'true');
            setRun(false);
          }
        }}
      />
      <button id="startTutorial" onClick={() => {
        setRun(true)
        setLocations([])
      }}>Start</button>
    </div>
  );
}