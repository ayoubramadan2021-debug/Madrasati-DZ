import {
  AppButton,
  AppCard,
  AppTextarea,
  EmptyState,
} from "../../../shared/components/ui";

type SupportMessage = {
  id: string;
  email: string;
  message: string;
  reply?: string;
};

type AdminSupportSectionProps = {
  theme: any;
  supportMessages: SupportMessage[];

  replyText: string;
  setReplyText: (value: string) => void;

  handleReply: (id: string) => void;
};

function AdminSupportSection({
  theme,
  supportMessages,
  replyText,
  setReplyText,
  handleReply,
}: AdminSupportSectionProps) {
  return (
    <AppCard theme={theme}>
      <h2 style={{ color: theme.text }}>💬 رسائل الدعم</h2>

      {supportMessages.length === 0 ? (
        <EmptyState
          theme={theme}
          title="لا توجد رسائل دعم"
          message="لا توجد رسائل دعم بعد."
        />
      ) : (
        supportMessages.map((item) => (
          <div
            key={item.id}
            style={{
              marginTop: "16px",
              padding: "18px",
              borderRadius: "18px",
              border: `1px solid ${theme.border}`,
            }}
          >
            <strong>من: {item.email}</strong>

            <p
              style={{
                color: theme.muted,
                lineHeight: "1.8",
              }}
            >
              {item.message}
            </p>

            {item.reply ? (
              <p style={{ color: theme.muted }}>
                ✅ الرد: {item.reply}
              </p>
            ) : (
              <>
                <AppTextarea
                  theme={theme}
                  rows={3}
                  placeholder="اكتب رد الإدارة هنا..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />

                <AppButton
                  theme={theme}
                  onClick={() => handleReply(item.id)}
                >
                  إرسال الرد
                </AppButton>
              </>
            )}
          </div>
        ))
      )}
    </AppCard>
  );
}

export default AdminSupportSection;
