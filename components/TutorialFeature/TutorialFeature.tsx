'use client';

import { useState, useEffect } from 'react';
import Joyride, { ACTIONS, STATUS, EVENTS } from 'react-joyride';
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
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    const startTutorialButton = document.getElementById('startTutorial');
    if (
      !hasSeenTour &&
      !locations.includes(location) &&
      location !== '/login' &&
      startTutorialButton &&
      tutorialRunning
    ) {
      startTutorialButton.click();
      setLocations([...locations, location]);
    }
  }, [location, locations, tutorialRunning, steps]);

  console.log('tutorialRunning', tutorialRunning);

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
          const finishedStatuses = ['finished'];
          if (
            locations.length === 1 &&
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
            const newLocations = [...locations];
            newLocations.shift();

            setLocations(newLocations);
            router.push('/settings/mapTemplateMessages');
          }
          if (
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
          if (data.action === ACTIONS.CLOSE || data.status === STATUS.SKIPPED) {
            dispatch(updateTutorialData({ tutorialRunning: false }));
            setRun(false);
          }
          if (finishedStatuses.includes(status)) {
            setRun(false);
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
