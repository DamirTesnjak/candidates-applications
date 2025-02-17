'use client';

import { useState, useEffect } from 'react';
import Joyride, { EVENTS } from 'react-joyride';
import { useRouter, usePathname } from '@/i18n/routing';
import HelpIcon from '@mui/icons-material/Help';
import Button from '@/UI/Button/Button';
import { useTranslations, useLocale } from 'next-intl';

interface ITourSteps {
  [x: string]: {
    target: string;
    content: string;
  }[];
}

export default function TutorialFeature() {
  const locale = useLocale();
  console.log('locale', locale);
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
  const [startTutorial, setStartTutorial] = useState(false);

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
          target: '#tableElement',
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
          target: '#candidates',
          content: translation('candidates2'),
        },
      ]);
    } else {
      setSteps(tourSteps[location] || []);
    }
  }, [location, locations, translation]);

  useEffect(() => {
    // if there is ono data, replace with images
    if (location === '/settings/overviewEmailTemplateMessages') {
      const tableElement = document.getElementById('tableElement');

      if (!tableElement) {
        const message = document.getElementById('message');
        if (message && message.style) {
          message.style.display = 'none';
        }
        const element = document.createElement('div');
        element.setAttribute('id', 'tableElement');
        element.innerHTML = `<img id="candidates" src="/templates_${locale}.png" alt="table image"/>`;

        const containerElement = document.getElementById('container');
        containerElement?.appendChild(element);
      }
    }
    if (location === '/settings/mapTemplateMessages') {
      const modalElement = document.getElementById('modal');
      if (modalElement && modalElement.style) {
        modalElement.style.display = 'none';
      }
    }
    if (location === '/candidates') {
      const tableElement = document.getElementById('candidates');

      if (!tableElement) {
        const message = document.getElementById('message');
        message?.remove();

        const element = document.createElement('div');
        element.innerHTML = `<img id="candidates" src="/candidates_${locale}.png" alt="table image"/>`;

        const containerElement = document.getElementById('container');
        containerElement?.appendChild(element);
      }
    }
  }, [location]);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    const startTutorialButton = document.getElementById('startTutorial');
    if (
      !hasSeenTour &&
      !locations.includes(location) &&
      location !== '/login' &&
      startTutorialButton &&
      startTutorial
    ) {
      startTutorialButton.click();
      setLocations([...locations, location]);
    }
  }, [location, locations, startTutorial, steps]);

  console.log('startTutorial', startTutorial);

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

            const message = document.getElementById('message');
            if (message && message.style) {
              message.style.display = 'block';
            }

            const image = document.querySelector(
              'img[id="tableElement"]',
            ) as HTMLImageElement;
            if (image && image.style) {
              image.style.display = 'none';
            }

            setLocations(newLocations);
            router.push('/settings/mapTemplateMessages');
          }
          if (
            data.type === EVENTS.TARGET_NOT_FOUND &&
            location === '/settings/mapTemplateMessages'
          ) {
            const modalElement = document.getElementById('modal');
            if (modalElement && modalElement.style) {
              modalElement.style.display = 'block';
            }
            router.push('/candidates');
          }
          if (finishedStatuses.includes(status) &&
            locations.length > 2 &&
            location === '/candidates'
          ) {
            setStartTutorial(false);
          }
          if (finishedStatuses.includes(status)) {
            const message = document.getElementById('message');
            if (message && message.style) {
              message.style.display = 'block';
            }

            const image = document.querySelector(
              'img[id="candidates"]',
            ) as HTMLImageElement;
            if (image && image.style) {
              image.style.display = 'none';
            }
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
          setStartTutorial(true);
          setLocations([]);
        }}
      />
    </div>
  );
}
