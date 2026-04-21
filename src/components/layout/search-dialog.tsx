"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type SearchDialogProps = {
  triggerClassName?: string
}

export function SearchDialog({ triggerClassName }: SearchDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const search = query.trim()

    router.push(search ? `/camisetas?search=${encodeURIComponent(search)}` : "/camisetas")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label="Buscar camisetas"
          variant="ghost"
          size="icon"
          className={triggerClassName}
        >
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl rounded-[2rem] border border-border/70 bg-white p-8">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl tracking-[-0.04em]">
            Buscar en la coleccion
          </DialogTitle>
          <DialogDescription>
            Encuentra camisetas por tono, fit, categoria o estilo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-[1.5rem] border border-border bg-muted/35 p-2">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ej. oversized black, grafica, sand..."
              className="h-14 border-none bg-transparent px-4 text-base shadow-none focus-visible:ring-0"
            />
          </div>
          <Button
            type="submit"
            className="h-12 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Buscar camisetas
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
