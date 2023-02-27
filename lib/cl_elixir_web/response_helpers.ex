defmodule ClElixirWeb.ResponseHelpers do
  @moduledoc """
  Utility functions to help with serialization for http responses
  """

  alias Ecto.Changeset
  alias Scrivener.Page

  import ClElixir.Utils
  import Phoenix.Controller
  import Plug.Conn

  defguardp is_schema(schema) when is_struct(schema) and is_map_key(schema, :__meta__)
  defguardp is_plain_map(map) when is_map(map) and not is_struct(map)

  @doc """
  Create a response for the client using `data` and `conn`.
  """
  def json_as_camel_case(data, conn) do
    case data do
      nil ->
        json_as_camel_case(%{}, conn)

      {:ok, data} when is_atom(data) ->
        json_as_camel_case(%{status: Atom.to_string(data)}, conn)

      {:ok, data} ->
        json_as_camel_case(data, conn)

      {:error, {_step, reason}} ->
        IO.inspect(data)
        json_as_camel_case({:error, reason}, conn)

      {:error, %Changeset{valid?: false} = changeset} ->
        conn |> put_status(:bad_request) |> json(format_errors(changeset))

      {:error, reason} ->
        conn |> put_status(:bad_request) |> json(%{error: reason})

      {:error, _step, %Changeset{valid?: false} = changeset, _multi} ->
        conn |> put_status(:bad_request) |> json(format_errors(changeset))

      {:error, _step, reason, _multi} ->
        conn |> put_status(:bad_request) |> json(%{error: reason})

      data when is_map(data) or is_list(data) ->
        json(conn, camel_case(data))
    end
  end

  @doc """
  Convert `data` into a suitable format for the client.
  """
  def camel_case(data) do
    case data do
      schema when is_schema(schema) -> schema_to_map(schema)
      [schema | _] = schemas when is_schema(schema) -> schema_to_map(schemas)
      %Page{} = page -> page |> Map.update!(:entries, &schema_to_map/1) |> Map.from_struct()
      map when is_plain_map(map) -> Map.new(map, fn {key, val} -> {key, camel_case(val)} end)
      data -> data
    end
    |> ProperCase.to_camel_case()
  end

  @doc """
  Format `Ecto.Changeset` errors.
  """
  def format_errors(changeset) do
    Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", inspect(value))
      end)
    end)
    |> Enum.map(fn {key, errors} -> {key, Enum.join(string_errors(errors), "; ")} end)
    |> Map.new()
  end

  def string_errors(list) when is_list(list) do
    Enum.map(list, fn item ->
      string_errors(item)
    end)
  end

  def string_errors(item) when is_binary(item), do: item
  def string_errors(item), do: inspect(item)

  @doc """
  Send a `204 No Content` response for a success result.
  """
  def success_no_content({:ok, _}, conn), do: send_resp(conn, :no_content, "")
  def success_no_content({:error, _} = error, _conn), do: error
end
