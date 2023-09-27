import type { DataProviderDataType } from 'shared/models/data-provider.model';
import type IDataProvider from 'shared/models/data-provider.interface';

declare module 'paranext-extension-template-hello-world' {
  export type ExtensionVerseSetData = string | { text: string; isHeresy: boolean };

  export type ExtensionVerseDataTypes = {
    Verse: DataProviderDataType<string, string | undefined, ExtensionVerseSetData>;
    Heresy: DataProviderDataType<string, string | undefined, string>;
    Chapter: DataProviderDataType<[book: string, chapter: number], string | undefined, never>;
  };

  /** Network event that informs subscribers when the command `extensionTemplateHelloWorld.doStuff` is run */
  export type DoStuffEvent = {
    /** How many times the extension template has run the command `extensionTemplateHelloWorld.doStuff` */
    count: number;
  };

  export type ExtensionVerseDataProvider = IDataProvider<ExtensionVerseDataTypes>;
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'extensionTemplateHelloWorld.doStuff': (message: string) => {
      response: string;
      occurrence: number;
    };
  }
}
