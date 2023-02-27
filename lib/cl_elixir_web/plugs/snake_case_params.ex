defmodule ClElixirWeb.Plugs.SnakeCaseParams do
  @moduledoc false

  @behaviour Plug

  @form_param_keys ["schema", "ui_schema", "uiSchema", "data", "formData", "form_data"]

  def init(default), do: default

  def call(%{params: params} = conn, _opts) do
    %{conn | params: to_snake_case(params)}
  end

  def to_snake_case(value) do
    case value do
      {key, value} when is_number(key) -> {key, value}
      {key, value} when key in @form_param_keys -> {Macro.underscore(key), value}
      {key, %Plug.Upload{} = value} -> {Macro.underscore(key), value}
      {key, value} -> {Macro.underscore(key), to_snake_case(value)}
      list when is_list(list) -> Enum.map(list, &to_snake_case/1)
      map when is_map(map) -> Map.new(map, &to_snake_case/1)
      value -> value
    end
  end
end
