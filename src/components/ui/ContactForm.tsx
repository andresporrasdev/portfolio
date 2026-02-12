"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "./Button";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-2">{t("name")}</label>
        <input
          {...register("name")}
          placeholder={t("name_placeholder")}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-accent-coral">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("email")}</label>
        <input
          {...register("email")}
          type="email"
          placeholder={t("email_placeholder")}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-accent-coral">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t("message")}
        </label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder={t("message_placeholder")}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-accent-coral">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("sending")}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t("send")}
          </>
        )}
      </Button>

      {status === "success" && (
        <p className="text-sm text-accent-teal text-center">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-accent-coral text-center">{t("error")}</p>
      )}
    </form>
  );
}
