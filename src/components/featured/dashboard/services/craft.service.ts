"use server"

import { generateSlug } from "@/lib/utils";
// import { generateSlug } from "@/lib/utils";
import prisma from "../../../../../lib/prisma";
import { Craft } from "../types/Craft";
const prismaDb = prisma;

export async function createCraft(params: Craft) {
    const slug = generateSlug(params.name);
    const data = await prismaDb.craft.create({
        data: {
            name: params.name,
            type: params.type,
            owner: params.owner,
            email: params.email,
            phone: params.phone,
            maps: params.maps,
            images: params.images,
            description: params.description,
            slug: slug,
        },
    });
    return data;
}

export async function getAllCraftGallery() {
    const data = await prismaDb.craft.findMany({
        select: {
            id: true,
            name: true,
            type: true,
            description: true,
            images: true,
            slug: true,
        }
    });
    return data;
}

export async function getCraftBySlug(slug: string) {
    const data = await prismaDb.craft.findUnique({
        where: {
            slug: slug,
        },
        select: {
            id: true,
            name: true,
            type: true,
            description: true,
            images: true,
            slug: true,
            email: true,
            phone: true,
            maps: true,
            owner: true, 
        }
    });
    return data;
}

export async function getCraftByCategory(type: string) {
    const data = await prisma.craft.findMany({
        where: {
            type: type
        },
        select: {
            id: true,
            name: true,
            type: true,
            owner: true,
            email: true,
            phone: true,
            maps: true,
            images: true,
            slug: true,
            description: true
        }
    });
    return data;
}

export async function getAllCraft() {
    const data = await prismaDb.craft.findMany({
        select: {
            id: true,
            name: true,
            type: true,
            owner: true,
            email: true,
            phone: true,
            maps: true,
            images: true,
        }
    });
    return data;
}