import clsx from 'clsx';

const controlBase =
  'relative rounded-[var(--ax-public-input-border-radius-medium)] border border-[var(--ax-public-input-root-border-color)] text-[var(--ax-public-input-root-color)] transition-all focus-within:border-[var(--ax-public-input-root-border-color-focus)]';

const controlError =
  'bg-[var(--ax-public-input-root-background-color-error)] border-[var(--ax-public-input-root-border-color-error)] text-[var(--ax-public-input-root-color-error)] [&_.wb-variable-mention]:border [&_.wb-variable-mention]:border-[color-mix(in_srgb,var(--ax-public-input-root-border-color-error),transparent_50%)] [&_.wb-variable-mention]:bg-transparent';

const inputBase =
  'relative z-[1] m-0 box-border block w-full resize-none overflow-hidden text-ellipsis whitespace-nowrap border-none bg-transparent p-[var(--ax-public-input-padding-medium)] text-xs font-normal leading-[140%] outline-none';

const highlighterBase =
  'pointer-events-none box-border overflow-hidden border-none bg-transparent p-[var(--ax-public-input-padding-medium)] text-xs font-normal leading-[140%] text-transparent';

export const variableTextClasses = {
  control: (hasError: boolean) => clsx(controlBase, hasError && controlError),
  controlSingleLine: (hasError: boolean) => clsx(controlBase, hasError && controlError),
  controlMultiLine: (hasError: boolean) => clsx(controlBase, hasError && controlError),
  input: inputBase,
  inputMultiLine: clsx(inputBase, 'min-h-20 whitespace-pre-wrap [overflow-wrap:anywhere] [resize:vertical]'),
  highlighter: highlighterBase,
  highlighterMultiLine: clsx(highlighterBase, 'whitespace-pre-wrap [overflow-wrap:anywhere]'),
  mention:
    'wb-variable-mention -ml-0.5 -mt-px box-decoration-clone rounded bg-[var(--wb-variable-text-mention-bg)] px-0.5 py-0.5 text-center text-transparent',
  suggestions:
    'fixed bottom-auto! right-auto! left-1/2! top-1/2! z-[300] flex max-h-[calc(100dvh-2rem)] w-[600px]! max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[var(--ax-public-input-border-radius-medium)] border border-[var(--wb-variable-text-suggestion-border)] bg-[var(--wb-variable-text-suggestion-bg)] shadow-[0_4px_12px_rgb(0_0_0/12%)]',
  suggestionsList: 'm-0 flex-1 list-none overflow-y-auto p-0 pb-2',
  suggestionItem: 'cursor-pointer rounded-none p-1.5',
  suggestionItemFocused: 'bg-[var(--wb-variable-text-suggestion-hover)]',
  suggestionsContainer: 'wb-variable-suggestions flex flex-col overflow-hidden pt-2',
  suggestionsHeader: 'flex items-center justify-between px-2 py-1 pl-3',
  suggestionsTitle: 'ax-public-h10',
  groupHeader:
    'ax-public-h10 flex flex-1 items-center gap-1 p-1.5 not-first:mt-1 not-first:pt-2 [&_svg]:fill-[var(--wb-txt-ghost-primary-default)]',
  iconWrapper:
    'flex items-center justify-center gap-2 p-[7px] [&_svg]:fill-[var(--wb-txt-ghost-primary-default)]',
  suggestionContent: 'flex flex-col gap-px p-1.5',
  suggestionLabel: 'ax-public-h10 text-[var(--ax-txt-primary-default)]',
  suggestionDescription: 'ax-public-p11 text-[var(--ax-txt-primary-default)]',
} as const;

export function getVariableTextClassNames(hasError: boolean, singleLine: boolean) {
  const control = singleLine
    ? variableTextClasses.controlSingleLine(hasError)
    : variableTextClasses.controlMultiLine(hasError);

  return {
    control,
    input: singleLine ? variableTextClasses.input : variableTextClasses.inputMultiLine,
    highlighter: singleLine ? variableTextClasses.highlighter : variableTextClasses.highlighterMultiLine,
    suggestions: variableTextClasses.suggestions,
    suggestionsList: variableTextClasses.suggestionsList,
    suggestionItem: variableTextClasses.suggestionItem,
    suggestionItemFocused: variableTextClasses.suggestionItemFocused,
  };
}
