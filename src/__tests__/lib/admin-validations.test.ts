// Tests para las validaciones Zod del módulo de administración
import { describe, it, expect } from "vitest";
import {
    adminProfileUpdateSchema,
    statusChangeSchema,
    featuredToggleSchema,
    photoStatusSchema,
    exportParamsSchema,
    listModelsParamsSchema,
} from "@/lib/admin-validations";

describe("adminProfileUpdateSchema", () => {
    it("valida datos correctos", () => {
        const result = adminProfileUpdateSchema.safeParse({
            artisticName: "María García",
            bio: "Modelo profesional con 5 años de experiencia",
            height: 170,
            weight: 55,
            eyeColor: "marrón",
            hairColor: "negro",
        });
        expect(result.success).toBe(true);
    });

    it("acepta campos nullish", () => {
        const result = adminProfileUpdateSchema.safeParse({
            artisticName: null,
            bio: undefined,
            height: null,
        });
        expect(result.success).toBe(true);
    });

    it("rechaza bio mayor a 2000 caracteres", () => {
        const result = adminProfileUpdateSchema.safeParse({
            bio: "a".repeat(2001),
        });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain("2000");
        }
    });

    it("rechaza altura menor a 100", () => {
        const result = adminProfileUpdateSchema.safeParse({
            height: 50,
        });
        expect(result.success).toBe(false);
    });

    it("rechaza altura mayor a 250", () => {
        const result = adminProfileUpdateSchema.safeParse({
            height: 300,
        });
        expect(result.success).toBe(false);
    });

    it("valida formato de medidas correcto", () => {
        const result = adminProfileUpdateSchema.safeParse({
            measurements: "90-60-90",
        });
        expect(result.success).toBe(true);
    });

    it("acepta medidas como string vacío", () => {
        const result = adminProfileUpdateSchema.safeParse({
            measurements: "",
        });
        expect(result.success).toBe(true);
    });

    it("rechaza formato de medidas incorrecto", () => {
        const result = adminProfileUpdateSchema.safeParse({
            measurements: "abc-def-ghi",
        });
        expect(result.success).toBe(false);
    });

    it("acepta URL de Instagram válida", () => {
        const result = adminProfileUpdateSchema.safeParse({
            instagram: "https://instagram.com/maria",
        });
        expect(result.success).toBe(true);
    });

    it("rechaza URL de Instagram inválida", () => {
        const result = adminProfileUpdateSchema.safeParse({
            instagram: "no-es-una-url",
        });
        expect(result.success).toBe(false);
    });

    it("acepta redes sociales como string vacío", () => {
        const result = adminProfileUpdateSchema.safeParse({
            instagram: "",
            twitter: "",
            tiktok: "",
        });
        expect(result.success).toBe(true);
    });

    it("coerce weight y height como números", () => {
        const result = adminProfileUpdateSchema.safeParse({
            height: "170",
            weight: "55",
        });
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.height).toBe(170);
            expect(result.data.weight).toBe(55);
        }
    });

    it("valida peso dentro de rango", () => {
        const valid = adminProfileUpdateSchema.safeParse({ weight: 60 });
        expect(valid.success).toBe(true);

        const tooLow = adminProfileUpdateSchema.safeParse({ weight: 10 });
        expect(tooLow.success).toBe(false);

        const tooHigh = adminProfileUpdateSchema.safeParse({ weight: 250 });
        expect(tooHigh.success).toBe(false);
    });

    it("valida talla de zapato dentro de rango", () => {
        const valid = adminProfileUpdateSchema.safeParse({ shoeSize: 38 });
        expect(valid.success).toBe(true);

        const tooLow = adminProfileUpdateSchema.safeParse({ shoeSize: 10 });
        expect(tooLow.success).toBe(false);

        const tooHigh = adminProfileUpdateSchema.safeParse({ shoeSize: 60 });
        expect(tooHigh.success).toBe(false);
    });
});

describe("statusChangeSchema", () => {
    it("acepta PENDING", () => {
        const result = statusChangeSchema.safeParse({ status: "PENDING" });
        expect(result.success).toBe(true);
    });

    it("acepta APPROVED", () => {
        const result = statusChangeSchema.safeParse({ status: "APPROVED" });
        expect(result.success).toBe(true);
    });

    it("acepta REJECTED", () => {
        const result = statusChangeSchema.safeParse({ status: "REJECTED" });
        expect(result.success).toBe(true);
    });

    it("rechaza estado inválido", () => {
        const result = statusChangeSchema.safeParse({ status: "INVALID" });
        expect(result.success).toBe(false);
    });

    it("rechaza objeto sin status", () => {
        const result = statusChangeSchema.safeParse({});
        expect(result.success).toBe(false);
    });

    it("rechaza status vacío", () => {
        const result = statusChangeSchema.safeParse({ status: "" });
        expect(result.success).toBe(false);
    });
});

describe("featuredToggleSchema", () => {
    it("acepta featured true", () => {
        const result = featuredToggleSchema.safeParse({ featured: true });
        expect(result.success).toBe(true);
    });

    it("acepta featured false", () => {
        const result = featuredToggleSchema.safeParse({ featured: false });
        expect(result.success).toBe(true);
    });

    it("rechaza featured como string", () => {
        const result = featuredToggleSchema.safeParse({ featured: "true" });
        expect(result.success).toBe(false);
    });

    it("rechaza sin featured", () => {
        const result = featuredToggleSchema.safeParse({});
        expect(result.success).toBe(false);
    });
});

describe("photoStatusSchema", () => {
    it("acepta APPROVED", () => {
        const result = photoStatusSchema.safeParse({ status: "APPROVED" });
        expect(result.success).toBe(true);
    });

    it("acepta REJECTED", () => {
        const result = photoStatusSchema.safeParse({ status: "REJECTED" });
        expect(result.success).toBe(true);
    });

    it("acepta PENDING", () => {
        const result = photoStatusSchema.safeParse({ status: "PENDING" });
        expect(result.success).toBe(true);
    });

    it("rechaza estado inválido", () => {
        const result = photoStatusSchema.safeParse({ status: "DELETED" });
        expect(result.success).toBe(false);
    });
});

describe("exportParamsSchema", () => {
    it("usa valores por defecto", () => {
        const result = exportParamsSchema.safeParse({});
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.format).toBe("csv");
            expect(result.data.status).toBe("ALL");
            expect(result.data.featured).toBe("all");
        }
    });

    it("acepta formato json", () => {
        const result = exportParamsSchema.safeParse({ format: "json" });
        expect(result.success).toBe(true);
    });

    it("acepta formato csv", () => {
        const result = exportParamsSchema.safeParse({ format: "csv" });
        expect(result.success).toBe(true);
    });

    it("rechaza formato inválido", () => {
        const result = exportParamsSchema.safeParse({ format: "xml" });
        expect(result.success).toBe(false);
    });

    it("acepta filtro de estado", () => {
        const result = exportParamsSchema.safeParse({ status: "APPROVED" });
        expect(result.success).toBe(true);
    });

    it("acepta filtro de featured", () => {
        const result = exportParamsSchema.safeParse({ featured: "true" });
        expect(result.success).toBe(true);
    });
});

describe("listModelsParamsSchema", () => {
    it("usa valores por defecto", () => {
        const result = listModelsParamsSchema.safeParse({});
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.page).toBe(1);
            expect(result.data.limit).toBe(20);
            expect(result.data.status).toBe("ALL");
            expect(result.data.featured).toBe("all");
            expect(result.data.sortBy).toBe("createdAt");
            expect(result.data.sortOrder).toBe("desc");
        }
    });

    it("coerce page y limit como números", () => {
        const result = listModelsParamsSchema.safeParse({
            page: "3",
            limit: "50",
        });
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.page).toBe(3);
            expect(result.data.limit).toBe(50);
        }
    });

    it("rechaza page menor a 1", () => {
        const result = listModelsParamsSchema.safeParse({ page: 0 });
        expect(result.success).toBe(false);
    });

    it("rechaza limit mayor a 100", () => {
        const result = listModelsParamsSchema.safeParse({ limit: 200 });
        expect(result.success).toBe(false);
    });

    it("acepta sortBy válido", () => {
        const fields = ["createdAt", "artisticName", "views", "status", "updatedAt"] as const;
        for (const field of fields) {
            const result = listModelsParamsSchema.safeParse({ sortBy: field });
            expect(result.success).toBe(true);
        }
    });

    it("rechaza sortBy inválido", () => {
        const result = listModelsParamsSchema.safeParse({ sortBy: "invalid" });
        expect(result.success).toBe(false);
    });

    it("acepta search como string", () => {
        const result = listModelsParamsSchema.safeParse({ search: "María" });
        expect(result.success).toBe(true);
    });

    it("acepta filtro de status ALL", () => {
        const result = listModelsParamsSchema.safeParse({ status: "ALL" });
        expect(result.success).toBe(true);
    });

    it("acepta filtro de status específico", () => {
        const result = listModelsParamsSchema.safeParse({ status: "APPROVED" });
        expect(result.success).toBe(true);
    });
});
