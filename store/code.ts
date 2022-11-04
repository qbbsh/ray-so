import { atom } from "jotai";
import { LANGUAGES, Language } from "../util/languages";

type CodeSample = {
  language: Language;
  code: string;
};

const CODE_SAMPLES: CodeSample[] = [
  {
    language: LANGUAGES.javascript,
    code: `module.exports = leftpad;

function leftpad(str, len, ch) {
  str = String(str);
  var i = -1;

  if (!ch && ch !== 0) ch = ' ';

  len = len - str.length;

  while (i++ < len) {
    str = ch + str;
  }
  return str;
}`,
  },
  {
    language: LANGUAGES.swift,
    code: `import SwiftUI

struct CircleImage: View {
  var body: some View {
    Image("turtlerock")
      .clipShape(Circle())
  }
}`,
  },
  {
    language: LANGUAGES.tsx,
    code: `import { Detail } from "@raycast/api";

export default function Command() {
  return <Detail markdown="Hello World" />;
}`,
  },
];

const userInputtedLanguageAtom = atom<Language | null>(null);

export const selectedLanguageAtom = atom<Language | null, Language | null>(
  (get) =>
    get(userInputtedLanguageAtom) || get(codeExampleAtom)?.language || null,
  (get, set, newLanguage) => {
    set(userInputtedLanguageAtom, newLanguage);
  }
);

export const codeExampleAtom = atom<CodeSample | null>(null);
codeExampleAtom.onMount = (setAtom) => {
  setAtom(CODE_SAMPLES[Math.floor(Math.random() * CODE_SAMPLES.length)]);
};

export const userInputtedCodeAtom = atom<string | null>(null);

export const codeAtom = atom<string, string>(
  (get) => get(userInputtedCodeAtom) || get(codeExampleAtom)?.code || "",
  (get, set, newCode) => {
    set(userInputtedCodeAtom, newCode);
  }
);
