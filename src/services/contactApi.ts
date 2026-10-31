type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api/v1"
).replace(/\/+$/, "");

export async function submitContactMessage(payload: ContactPayload): Promise<void> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE}/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Could not reach the server. Check that the Django backend is running."
    );
  }

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const details = Object.entries(result)
      .map(([field, value]) => {
        const message = Array.isArray(value) ? value.join(" ") : String(value);
        return `${field}: ${message}`;
      })
      .join("; ");

    throw new Error(
      details || `Message submission failed (HTTP ${response.status}).`
    );
  }
}
