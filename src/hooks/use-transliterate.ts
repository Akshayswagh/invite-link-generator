import { useState, useCallback, useRef } from "react";

const GOOGLE_INPUT_TOOLS_URL =
  "https://inputtools.google.com/request?itc=mr-t-i0-und&num=5&cp=0&cs=1&ie=utf-8&oe=utf-8";

export function useTransliterate() {
  const [marathiText, setMarathiText] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const transliterate = useCallback(async (text: string) => {
    if (!text.trim()) {
      setMarathiText("");
      return;
    }

    // Split into words and transliterate each
    const words = text.trim().split(/\s+/);
    const transliteratedWords: string[] = [];

    for (const word of words) {
      try {
        const res = await fetch(GOOGLE_INPUT_TOOLS_URL + `&text=${encodeURIComponent(word)}`);
        const data = await res.json();
        // data[1][0][1] is an array of suggestions; pick the first one
        if (data?.[0] === "SUCCESS" && data?.[1]?.[0]?.[1]?.[0]) {
          transliteratedWords.push(data[1][0][1][0]);
        } else {
          transliteratedWords.push(word);
        }
      } catch {
        transliteratedWords.push(word);
      }
    }

    setMarathiText(transliteratedWords.join(" "));
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => transliterate(value), 300);
    },
    [transliterate]
  );

  return { marathiText, setMarathiText, handleInputChange };
}
