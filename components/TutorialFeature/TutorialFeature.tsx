'use client';

import { useState, useEffect } from 'react';
import Joyride, { ACTIONS, EVENTS } from 'react-joyride';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import HelpIcon from '@mui/icons-material/Help';
import Button from '@/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateTutorialData } from '@/lib/features/tutorialData/tutorialDataSlice';

interface ITourSteps {
  [x: string]: {
    target: string;
    content: string;
  }[];
}

export default function TutorialFeature() {
  const dispatch = useAppDispatch();
  const tutorialRunning = useAppSelector((state) => state.tutorialData.tutorialRunning);
  const translation = useTranslations('tutorial');
  const location = usePathname();
  const router = useRouter();
  const [steps, setSteps] = useState<
    {
      target: string;
      content: string;
    }[]
  >([]);
  const [run, setRun] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);


  useEffect(() => {
    const tourSteps: ITourSteps = {
      '/candidates': [
        {
          target: '#sidebar-settings',
          content: translation('candidates'),
        },
        {
          target: '#elementDoesNotExist',
          content: '',
        },
      ],
      '/settings': [
        {
          target: '#companyEmailConfiguration',
          content: translation('settings'),
        },
        { target: '#elementDoesNotExist', content: '' },
      ],
      '/settings/companyEmailConfiguration': [
        {
          target: '#form',
          content: translation('companyEmailConfiguration'),
        },
        {
          target: '#setupEmailTemplateMessages',
          content: translation('companyEmailConfiguration2'),
        },
        { target: '#elementDoesNotExist', content: '' },
      ],
      '/settings/setupEmailTemplateMessages': [
        {
          target: '#textEditorMainToolbar',
          content: translation('setupEmailTemplateMessages'),
        },
        {
          target: '#textEditorToolbar',
          content: translation('setupEmailTemplateMessages2'),
        },
        {
          target: '#editor',
          content: translation('setupEmailTemplateMessages3'),
        },
        {
          target: '#preview',
          content: translation('setupEmailTemplateMessages4'),
        },
        {
          target: '#overviewEmailTemplateMessages',
          content: translation('setupEmailTemplateMessages5'),
        },
        { target: '#elementDoesNotExist', content: '' },
      ],
      '/settings/overviewEmailTemplateMessages': [
        {
          target: '#table',
          content: translation('overviewEmailTemplateMessages'),
        },
        {
          target: '#mapEmailTemplateMessages',
          content: translation('overviewEmailTemplateMessages2'),
        },
        { target: '#elementDoesNotExist', content: '' },
      ],
      '/settings/mapTemplateMessages': [
        {
          target: '#form',
          content: translation('mapTemplateMessages'),
        },
        {
          target: '#sidebar-candidates',
          content: translation('mapTemplateMessages2'),
        },
        { target: '#elementDoesNotExist', content: '' },
      ],
    };
    if (locations.length > 2 && location === '/candidates') {
      setSteps([
        {
          target: '#table',
          content: translation('candidates2'),
        },
      ]);
    } else {
      setSteps(tourSteps[location] || []);
    }
  }, [location, locations, translation]);

  useEffect(() => {
    const startTutorialButton = document.getElementById('startTutorial');
    if (
      !locations.includes(location) &&
      location !== '/login' &&
      startTutorialButton &&
      tutorialRunning
    ) {
      startTutorialButton.click();
      setLocations([...locations, location]);
    }
  }, [location, locations, tutorialRunning, steps]);

  return (
    <div>
      <Joyride
        steps={steps}
        run={run}
        continuous
        scrollToFirstStep
        locale={{
          back: translation('back'),
          close: translation('close'),
          last: translation('last'),
          next: translation('next'),
          open: translation('open'),
          skip: translation('skip'),
      }}
        styles={{
          options: {
            arrowColor: '#ffffff',
            backgroundColor: '#ffffff',
            overlayColor: 'rgba(0, 0, 0, 0.4)',
            primaryColor: '#717bf3',
            textColor: '#313a46',
            width: 500,
            zIndex: 1000,
          },
        }}
        callback={(data) => {
          const { status } = data;
          console.log('data', data);
          const finishedStatuses = ['finished'];
          if (finishedStatuses.includes(status)) {
            setRun(false);
          }
          if (data.action === ACTIONS.CLOSE || data.action === ACTIONS.SKIP) {
            dispatch(updateTutorialData({ tutorialRunning: false }));
            setRun(false);
            return
          }
          if (
            tutorialRunning &&
            locations.length === 1 &&
            data.type === EVENTS.TARGET_NOT_FOUND &&
            location === '/candidates'
          ) {
            router.push('/settings');
          }
          if (
            tutorialRunning &&
            data.type === EVENTS.TARGET_NOT_FOUND &&
            location === '/settings'
          ) {
            router.push('/settings/companyEmailConfiguration');
          }
          if (
            tutorialRunning &&
            data.type === EVENTS.TARGET_NOT_FOUND &&
            location === '/settings/companyEmailConfiguration'
          ) {
            router.push('/settings/setupEmailTemplateMessages');
          }
          if (
            tutorialRunning &&
            data.type === EVENTS.TARGET_NOT_FOUND &&
            location === '/settings/setupEmailTemplateMessages'
          ) {
            router.push('/settings/overviewEmailTemplateMessages');
          }
          if (
            tutorialRunning &&
            data.type === EVENTS.TARGET_NOT_FOUND &&
            location === '/settings/overviewEmailTemplateMessages'
          ) {
            const newLocations = [...locations];
            newLocations.shift();

            setLocations(newLocations);
            router.push('/settings/mapTemplateMessages');
          }
          if (
            tutorialRunning &&
            data.type === EVENTS.TARGET_NOT_FOUND &&
            location === '/settings/mapTemplateMessages'
          ) {
            router.push('/candidates');
          }
          if (finishedStatuses.includes(status) &&
            locations.length > 2 &&
            location === '/candidates'
          ) {
            dispatch(updateTutorialData({ tutorialRunning: false }));
          }
        }}
      />
      <Button
        id='startTutorial'
        text='Tutorial'
        type='button'
        className='primaryTextButton'
        startIcon={<HelpIcon />}
        onClick={() => {
          setRun(true);
          dispatch(updateTutorialData({ tutorialRunning: true }));
          setLocations([]);
        }}
      />
    </div>
  );
}
