"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";

/* ── INFINZ TOKENS ── */
const G = {
  blue: "#1565C0",
  cyan: "#00BCD4",
  green: "#76C800",
  text: "#1a1a2e",
  muted: "#5a6172",
  border: "#e2e8f0",
  surface: "#f8fafc",
  white: "#ffffff",
  grad: "linear-gradient(135deg, #1565C0 0%, #00BCD4 55%, #76C800 100%)",
};

type Field = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
};

const FIELDS: Field[] = [
  { name: "fullName", label: "Full Name", placeholder: "Enter your full name", type: "text" },
  { name: "phone", label: "Phone Number", placeholder: "+91 9876543210", type: "tel" },
  { name: "email", label: "Email Address", placeholder: "you@example.com", type: "email" },
  { name: "loanAmount", label: "Loan Amount", placeholder: "₹50,00,000", type: "text" },
];

const PROPERTY_TYPES = [
  "Select Property Type",
  "Residential — Ready to Move",
  "Residential — Under Construction",
  "Commercial Property",
  "Plot + Construction",
  "Balance Transfer",
  "Home Loan Top-Up",
];

export const ContactForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    loanAmount: "",
    propertyType: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ── VALIDATION ── */
  const validate = () => {
    let newErrors: any = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter valid 10-digit phone";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!form.loanAmount.trim()) {
      newErrors.loanAmount = "Loan amount required";
    }

    if (!form.propertyType) {
      newErrors.propertyType = "Select property type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ── HANDLE CHANGE ── */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ── HANDLE SUBMIT ── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    emailjs.send(
      "service_1bm5ojp",      // Updated Service ID
      "template_c7cfd9q",     // Updated Template ID
      {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        loanAmount: form.loanAmount,
        propertyType: form.propertyType,
      },
      "RIvv9pK9iogfbQevC"     // Updated Public Key
    )
    .then(() => {
      setLoading(false);
      setSubmitted(true);

      // auto hide success
      setTimeout(() => {
        setSubmitted(false);
      }, 4000);

      // reset form
      setForm({
        fullName: "",
        phone: "",
        email: "",
        loanAmount: "",
        propertyType: "",
      });
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
      alert("Failed to send. Try again.");
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: "auto",
        padding: "20px 20px 24px 20px",
        background: G.white,
        borderRadius: 20,
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        border: `1px solid ${G.border}`,
      }}
    >
      <h3 style={{ 
        fontSize: 20, 
        fontWeight: 700, 
        color: G.blue, 
        marginBottom: 6,
        textAlign: "center"
      }}>
        Get Callback
      </h3>
      <p style={{
        fontSize: 12,
        color: G.muted,
        textAlign: "center",
        marginBottom: 20
      }}>
        Fill details & get expert advice
      </p>

      {FIELDS.map(({ name, label, placeholder, type }) => (
        <div key={name} style={{ marginBottom: 12 }}>
          <label style={{ 
            fontSize: 12, 
            fontWeight: 500, 
            color: G.text,
            display: "block",
            marginBottom: 4
          }}>
            {label}
          </label>

          <input
            type={type}
            name={name}
            value={form[name as keyof typeof form]}
            onChange={handleChange}
            placeholder={placeholder}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: 10,
              border: `1px solid ${errors[name] ? "#dc2626" : G.border}`,
              fontSize: 13,
              outline: "none",
              transition: "all 0.2s",
              backgroundColor: G.surface,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = G.cyan;
              e.target.style.boxShadow = `0 0 0 2px rgba(0,188,212,0.1)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors[name] ? "#dc2626" : G.border;
              e.target.style.boxShadow = "none";
            }}
          />

          {errors[name] && (
            <p style={{ color: "#dc2626", fontSize: 10, marginTop: 4, marginBottom: 0 }}>
              {errors[name]}
            </p>
          )}
        </div>
      ))}

      {/* PROPERTY TYPE */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ 
          fontSize: 12, 
          fontWeight: 500, 
          color: G.text,
          display: "block",
          marginBottom: 4
        }}>
          Property Type
        </label>

        <select
          name="propertyType"
          value={form.propertyType}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: 10,
            border: `1px solid ${errors.propertyType ? "#dc2626" : G.border}`,
            fontSize: 13,
            outline: "none",
            backgroundColor: G.surface,
            cursor: "pointer",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = G.cyan;
            e.target.style.boxShadow = `0 0 0 2px rgba(0,188,212,0.1)`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = errors.propertyType ? "#dc2626" : G.border;
            e.target.style.boxShadow = "none";
          }}
        >
          {PROPERTY_TYPES.map((o) => (
            <option key={o} value={o === "Select Property Type" ? "" : o}>
              {o}
            </option>
          ))}
        </select>

        {errors.propertyType && (
          <p style={{ color: "#dc2626", fontSize: 10, marginTop: 4, marginBottom: 0 }}>
            {errors.propertyType}
          </p>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: 50,
          border: "none",
          background: loading ? "#94a3b8" : "#2563eb",
          color: G.white,
          fontSize: 14,
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: loading ? "none" : "0 4px 12px rgba(37,99,235,0.25)",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(37,99,235,0.3)";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(37,99,235,0.25)";
          }
        }}
      >
        {loading ? "Submitting..." : "Get Callback "}
      </button>

      {/* ✅ SUCCESS MESSAGE BELOW BUTTON */}
      {submitted && (
        <p
          style={{
            marginTop: 12,
            fontSize: 11,
            color: "#10b981",
            textAlign: "center",
            fontWeight: 500,
            backgroundColor: "rgba(16,185,129,0.1)",
            padding: "8px 12px",
            borderRadius: 8,
          }}
        >
          ✓ Application received! We'll contact you within 30 mins.
        </p>
      )}
    </form>
  );
};