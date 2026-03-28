import ReactMarkdown from 'react-markdown'
import remarkGfm    from 'remark-gfm'
import type { Message } from '../../types'

interface Props { message: Message }

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
      {message.sketch_url && (
        <img
          src={message.sketch_url}
          alt="草图"
          className="w-14 h-10 object-cover rounded-md border border-black/10"
        />
      )}
      <div className={`max-w-[88%] text-[10px] leading-relaxed px-2.5 py-1.5 rounded-lg
        ${isUser
          ? 'bg-kc-yellow/15 border border-kc-yellow/35 text-amber-900 rounded-tr-sm'
          : 'bg-white border border-black/7 text-stone-700 shadow-sm rounded-tl-sm'
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            strong: ({ children }) => (
              <strong className="font-semibold text-kc-red">{children}</strong>
            ),
            code: ({ children }) => (
              <code className="bg-black/6 rounded px-1 font-mono text-[9px]">{children}</code>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
