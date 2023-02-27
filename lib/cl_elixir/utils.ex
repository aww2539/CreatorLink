defmodule ClElixir.Utils do

  defguardp is_schema(schema) when is_struct(schema) and is_map_key(schema, :__meta__)

  def schema_to_map(schema) when is_schema(schema) do
    schema
    |> Map.from_struct()
    |> Map.delete(:__meta__)
    |> Enum.reject(&match?({_, %Ecto.Association.NotLoaded{}}, &1))
    |> Map.new(fn {key, value} -> {key, schema_to_map(value)} end)
  end

  def schema_to_map(schemas) when is_list(schemas), do: Enum.map(schemas, &schema_to_map/1)
  def schema_to_map(value), do: value

end
