/**
 * EmojiIcon — يعرض Twemoji SVG بدل emoji النظام
 * يستخرج الـcodepoint ديناميكياً من الـemoji (يتجاهل variation selectors)
 */
import type { CSSProperties } from "react";

interface EmojiIconProps {
  emoji: string;
  size?: number;
  style?: CSSProperties;
}

/**
 * يحوّل emoji إلى Twemoji codepoint hex
 * - يأخذ أول codepoint فقط (يتجاهل variation selectors مثل U+FE0F)
 * - يستثني variation selector إذا كان أول char (نادر)
 */
function emojiToCodepoint(emoji: string): string | null {
  for (const char of emoji) {
    const cp = char.codePointAt(0);
    if (cp === undefined) continue;
    // تخطّى variation selectors و ZWJ
    if (cp === 0xfe0f || cp === 0x200d) continue;
    return cp.toString(16).toLowerCase();
  }
  return null;
}

export default function EmojiIcon({ emoji, size = 32, style }: EmojiIconProps) {
  const codepoint = emojiToCodepoint(emoji);

  if (!codepoint) {
    return (
      <span style={{ fontSize: size, lineHeight: 1, display: "inline-block", ...style }}>
        {emoji}
      </span>
    );
  }

  return (
    <img
      src={`/twemoji/${codepoint}.svg`}
      alt={emoji}
      width={size}
      height={size}
      draggable={false}
      onError={(e) => {
        // إذا الملف غير موجود، نُظهر الـemoji النصي بدلاً منه
        const img = e.currentTarget;
        const span = document.createElement("span");
        span.textContent = emoji;
        span.style.fontSize = `${size}px`;
        span.style.lineHeight = "1";
        img.replaceWith(span);
      }}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        userSelect: "none",
        WebkitUserSelect: "none",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
