import { ToolbarProps } from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import 'prosemirror-view/style/prosemirror.css';
import React, {
  ChangeEvent,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import MarkdownToggle from './MarkdownToggle';
import classes from './MdEditor.module.css';
import MenuBar from './MenuBar';
import { MdEditorValue } from './types';
import { toggleMarkdown } from './utils';

const MD_COOKIE = 'md_editor_markdown';

export interface MdEditorProps {
  autoFocus?: boolean;
  onChange?: (value: MdEditorValue) => void;
  value: MdEditorValue;
  className?: string;
  toolbarProps?: ToolbarProps;
  rememberMdSwitch?: boolean;
  // Formik compatibility
  name?: string;
  onChangeCompat?: (
    e: React.ChangeEvent<{ name?: string; value: MdEditorValue }>,
  ) => void;
}

export const MdEditor: React.FC<MdEditorProps> = React.memo((props) => {
  const { isMarkdown, markdown, prosemirror } = props.value;
  const viewRef = useRef<EditorView | null>(null);
  const propsRef = useRef(props);
  propsRef.current = props;

  const dispatchChange = useCallback(
    (value: MdEditorValue) => {
      const { name, onChange, onChangeCompat } = propsRef.current;
      if (onChange) {
        onChange(value);
      } else if (onChangeCompat) {
        const event: any = {
          target: { name, value },
        };
        onChangeCompat(event);
      }
    },
    [propsRef],
  );

  const dispatchTransaction = useCallback(
    (transaction: Transaction<any>) => {
      const { prosemirror } = propsRef.current.value;
      const newProsemirror = prosemirror.apply(transaction);
      const newValue = {
        prosemirror: newProsemirror,
        isMarkdown: false,
        markdown: null,
      };
      dispatchChange(newValue);
    },
    [propsRef, dispatchChange],
  );

  const createEditorView = useCallback(
    (node: HTMLDivElement | null) => {
      if (!viewRef.current && node) {
        viewRef.current = new EditorView(node, {
          state: propsRef.current.value.prosemirror,
          dispatchTransaction,
          attributes: {
            class: classes.ProseMirrorView,
          },
        });

        if (propsRef.current.autoFocus) {
          viewRef.current.focus();
        }
      }
    },
    [viewRef, propsRef, dispatchTransaction],
  );

  const onToggleMarkdown = useCallback(() => {
    const { value, rememberMdSwitch } = propsRef.current;
    dispatchChange(toggleMarkdown(value));
    if (rememberMdSwitch) {
      if (value.isMarkdown) {
        Cookies.remove(MD_COOKIE);
      } else {
        Cookies.set(MD_COOKIE, '1');
      }
    }
  }, [propsRef, dispatchChange]);

  const onMarkdownChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { prosemirror } = propsRef.current.value;
      dispatchChange({
        isMarkdown: true,
        markdown: e.target.value,
        prosemirror,
      });
    },
    [propsRef, dispatchChange],
  );

  useLayoutEffect(() => {
    const { rememberMdSwitch, value } = propsRef.current;
    if (!rememberMdSwitch) {
      return;
    }
    const currentMd = value.isMarkdown;
    const savedMd = !!Cookies.get(MD_COOKIE);
    if (currentMd !== savedMd) {
      onToggleMarkdown();
    }
  }, [propsRef, onToggleMarkdown]);

  useLayoutEffect(() => {
    if (viewRef.current) {
      viewRef.current.updateState(props.value.prosemirror);
    }
  }, [viewRef, props.value]);

  return (
    <div className={clsx(classes.container, props.className)}>
      <MenuBar
        state={prosemirror}
        dispatch={dispatchTransaction}
        markdownMode={isMarkdown}
        toolbarProps={props.toolbarProps}
      >
        <MarkdownToggle active={isMarkdown} onClick={onToggleMarkdown} />
      </MenuBar>
      <div
        ref={createEditorView}
        className={clsx({
          [classes.ProseMirrorContainer]: true,
          [classes.hidden]: isMarkdown,
        })}
        spellCheck
      />
      <div
        className={clsx({
          [classes.MarkdownContainer]: true,
          [classes.hidden]: !isMarkdown,
        })}
      >
        <textarea
          spellCheck
          className={classes.MarkdownTextarea}
          value={markdown || undefined}
          onChange={onMarkdownChange}
        />
      </div>
    </div>
  );
});

MdEditor.displayName = 'MdEditor';

export default MdEditor;
