import papi from 'papi-frontend';
import { useCallback, useState } from 'react';
import type {
  DoStuffEvent,
  ExtensionVerseDataProvider,
  ExtensionVerseDataTypes,
} from 'paranext-extension-template-hello-world';
import { Button } from 'papi-components';
import type { QuickVerseDataTypes } from 'quick-verse';

const {
  react: {
    hooks: { useData, useDataProvider, useEvent },
  },
  logger,
} = papi;

globalThis.webViewComponent = function ExtensionTemplate() {
  const [clicks, setClicks] = useState(0);

  useEvent<DoStuffEvent>(
    'extensionTemplateHelloWorld.doStuff',
    useCallback(({ count }) => setClicks(count), []),
  );

  const extensionVerseDataProvider = useDataProvider<ExtensionVerseDataProvider>(
    'paranextExtensionTemplate.quickVerse',
  );

  const [latestExtensionVerseText] = useData.Verse<ExtensionVerseDataTypes, 'Verse'>(
    extensionVerseDataProvider,
    'latest',
    'Loading latest Scripture text from extension template...',
  );

  const [latestQuickVerseText] = useData.Verse<QuickVerseDataTypes, 'Verse'>(
    'quickVerse.quickVerse',
    'latest',
    'Loading latest Scripture text from extension template...',
  );

  return (
    <>
      <div className="title">
        Extension Template Hello World <span className="framework">React</span>
      </div>
      <div>{latestExtensionVerseText}</div>
      <div>{latestQuickVerseText}</div>
      <div>
        <Button
          onClick={async () => {
            const start = performance.now();
            const result = await papi.commands.sendCommand(
              'extensionTemplateHelloWorld.doStuff',
              'Extension Template Hello World React Component',
            );
            setClicks(clicks + 1);
            logger.info(
              `command:extensionTemplateHelloWorld.doStuff '${result.response}' took ${
                performance.now() - start
              } ms`,
            );
          }}
        >
          Hi {clicks}
        </Button>
      </div>
    </>
  );
};
