import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Undo,
    Redo,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TiptapEditorProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    className?: string;
}

export function TiptapEditor({
    value,
    onChange,
    placeholder = 'Write something...',
    className,
}: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder,
                emptyEditorClass: 'is-editor-empty',
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: cn(
                    'min-h-[150px] w-full px-3 py-2 text-sm',
                    'prose prose-sm max-w-none dark:prose-invert',
                    'focus:outline-none',
                    'placeholder:text-muted-foreground',
                    className,
                ),
            },
        },
        immediatelyRender: false,
    });

    if (!editor) return null;

    return (
        <div
            className={cn(
                'overflow-hidden rounded-md border border-input bg-background',
                'transition-[color,box-shadow]',
                'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
            )}
        >
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b border-input bg-muted/50 p-1">
                <Toggle
                    size="sm"
                    pressed={editor.isActive('bold')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                    aria-label="Bold"
                >
                    <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('italic')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                    aria-label="Italic"
                >
                    <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('heading', { level: 2 })}
                    onPressedChange={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    aria-label="Heading 2"
                >
                    <Heading2 className="h-4 w-4" />
                </Toggle>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <Toggle
                    size="sm"
                    pressed={editor.isActive('bulletList')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    aria-label="Bullet list"
                >
                    <List className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('orderedList')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    aria-label="Numbered list"
                >
                    <ListOrdered className="h-4 w-4" />
                </Toggle>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <Toggle
                    size="sm"
                    pressed={false}
                    onPressedChange={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    aria-label="Undo"
                >
                    <Undo className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={false}
                    onPressedChange={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    aria-label="Redo"
                >
                    <Redo className="h-4 w-4" />
                </Toggle>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} />
        </div>
    );
}