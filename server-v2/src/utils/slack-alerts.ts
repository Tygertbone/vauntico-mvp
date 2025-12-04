export const sendSlackAlert = async (message: string, details?: any) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('SLACK_WEBHOOK_URL not configured, skipping alert');
    return;
  }

  try {
    const payload = {
      text: `🚨 Vauntico API Alert: ${message}`,
      attachments: details ? [{
        color: 'danger',
        fields: [
          {
            title: 'Details',
            value: `\`\`\`${JSON.stringify(details, null, 2)}\`\`\``,
            short: false
          }
        ],
        ts: Math.floor(Date.now() / 1000)
      }] : []
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('Failed to send Slack alert:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending Slack alert:', error);
  }
};

export default { sendSlackAlert };
