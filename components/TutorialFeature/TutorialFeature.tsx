'use client';

import { useState, useEffect } from 'react';
import Joyride, { EVENTS } from 'react-joyride';
import { useRouter, usePathname } from '@/i18n/routing';

export default function TutorialFeature() {
  const location = usePathname();
  const router = useRouter();
  const [steps, setSteps] = useState([]);
  const [run, setRun] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const tourSteps = {
      '/candidates': [
        {
          target: '#sidebar-settings',
          content:
            "Before you start using this app. We need you to show you how to setup important settings! Without it some functionalities of " +
            "this app will not be working properly. Lets us visit the 'SETTING' section of an app! You can skip this tutorial at any given time.",
        },
        {
          target: '#elementDoesNotExist',
          content: "",
        }
      ],
      '/settings': [
        {
          target: '#companyEmailConfiguration',
          content: "We are  at the 'SETTINGS'. As you can see we have tabs for different sections of Settings. Lets visit the first one!"
        },
        { target: '#elementDoesNotExist', content: '' },
      ],
      '/settings/companyEmailConfiguration': [
        { target: '#form', content: 'This form is very important! It allows you to setup email configuration for sending emails to candidates' +
            ' and employees. Pass all required information of your email provider. Settings will be saved in your database.' +
            'To change configuration, just visit this section again and fill the form and save the changes. New configuration is in effect immediately!',
        },
        {
          target: '#setupEmailTemplateMessages',
          content: 'Let us visit the next section of settings!',
        },
        { target: '#elementDoesNotExist', content: '' },
      ],
      '/settings/setupEmailTemplateMessages': [
        {
          target: '#textEditorMainToolbar',
          content: 'Here we can configure an email templates! Why writing the same email over again when you can just send an template, filled with ' +
            'proper information. To start, in the field "NAME" you assign the name of the template. Next you can select the preexisting one or create a new one.' +
            ' You may also upload a company logo which will be included later in a sending email. Changes can be saved on click on an button "SAVE CHANGES". ' +
            'The new templates are saved in your database!',
        },
        { target: '#textEditorToolbar', content: 'Toolbar to help you to insert necessary HTML tags in editor. Named buttons insert a specific constants in ' +
            'editor e.g. [COMPANY_NAME]. They will be later replaced with a proper information when you send an email!' },
        { target: '#editor', content: 'Here write any email template as HTML markup. Use the toolbar to easy insert HTML tags.' },
        { target: '#preview', content: 'See the written template as will be displayed in a sent email!' },
        {
          target: '#overviewEmailTemplateMessages',
          content: 'Let us visit the next section of settings!',
        },
        { target: '#elementDoesNotExist',
          content: '' ,
        },
      ],
      '/settings/overviewEmailTemplateMessages': [
        { target: '#overviewEmailTemplateMessages',
          content: 'On this page you can see the saved email templates as data in table. Action icons in table rows allows you to ' +
            'edit existing email templates or deleting them!',
        },
        { target: '#elementDoesNotExist', content: '' },
      ],
      '/settings/mapTemplateMessages': [
        { target: '#form', content: 'Here assign email templates to proper "ACTIONS: archive, hire, reject". New settings are in effect immediately! '},
        { target: '#sidebar-help', content: 'Now you know how to setup the settings. Information of other functionalities can be find under ' +
            'the HELP section, listed in sidebar!' },
      ],
    };
    setSteps(tourSteps[location] || []);
  }, [location, run]);

  useEffect(() => {
    const startTutorialButton = document.getElementById('startTutorial');
    if (
      !locations.includes(location) &&
      location !== '/login' &&
      startTutorialButton
    ) {
      console.log(
        'ieuiuiutieurtieutieutiutieutieutieutieutieutieutieutiuetieut',
      );
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
          const finishedStatuses = ['finished', 'skipped'];
          console.log('data', data);
          if (
            data.type === EVENTS.TARGET_NOT_FOUND &&
            location === '/candidates'
          ) {
            router.push('/settings');
          }
          if (
            data.type === EVENTS.TARGET_NOT_FOUND &&
            location === '/settings'
          ) {
            router.push('/settings/companyEmailConfiguration');
          }
          if (
            data.type === EVENTS.TARGET_NOT_FOUND &&
            location === '/settings/companyEmailConfiguration'
          ) {
            router.push('/settings/setupEmailTemplateMessages');
          }
          if (
            data.type === EVENTS.TARGET_NOT_FOUND &&
            location === '/settings/setupEmailTemplateMessages'
          ) {
            router.push('/settings/overviewEmailTemplateMessages');
          }
          if (
            data.type === EVENTS.TARGET_NOT_FOUND &&
            location === '/settings/overviewEmailTemplateMessages'
          ) {
            router.push('/settings/mapTemplateMessages');
          }
          if (finishedStatuses.includes(status)) {
            localStorage.setItem('hasSeenTour', 'true');
            setRun(false);
          }
        }}
      />
      <button
        id='startTutorial'
        onClick={() => {
          setRun(true);
          setLocations([]);
        }}
      >
        Start
      </button>
    </div>
  );
}
