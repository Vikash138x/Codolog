"use client";

import { useEffect } from "react";
import { initializeVisitor } from "@/utils/dynamic_pagetitle/visitor";

export default function VisitorInitializer() {
  useEffect(() => {
    initializeVisitor();
  }, []);

  return null;
}