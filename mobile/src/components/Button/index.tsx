// Mesmo padrão de componente reutilizável do modelo da disciplina.
import React from "react";

import { Button } from "../ui";

export function ButtonFatec({
  text,
  action,
  disabled = false,
}: {
  text: string;
  action: () => void;
  disabled?: boolean;
}) {
  return <Button title={text} onPress={action} disabled={disabled} />;
}
