"use client";

import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Switch,
} from "@/src/components/core/index";
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const ComponentsDemonstration = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [progress, setProgress] = useState(33);
  const [comboValue, setComboValue] = useState("");
  const [comboOpen, setComboOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const tableData = [
    { id: 1, name: "João Silva", email: "joao@email.com", status: "Ativo" },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      status: "Inativo",
    },
    { id: 3, name: "Pedro Costa", email: "pedro@email.com", status: "Ativo" },
    { id: 4, name: "Ana Oliveira", email: "ana@email.com", status: "Pendente" },
  ];

  return (
    <div className="min-h-screen w-full bg-zinc-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Precific</h1>
          <p className="text-base text-zinc-400">Shadcn Components</p>
        </div>

        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Diferentes variações de botões</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </CardContent>
        </Card>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Título</CardTitle>
              <CardDescription>Descrição do card</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Conteúdo do card com informações relevantes.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Ação</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Progresso</Label>
                <Progress value={progress} className="mt-2" />
                <p className="text-sm text-slate-600 mt-1">
                  {progress}% completo
                </p>
              </div>
              <Button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                variant="outline"
                size="sm"
              >
                Aumentar Progresso
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={switchChecked}
                  onCheckedChange={setSwitchChecked}
                  id="notifications"
                />
                <Label htmlFor="notifications">Notificações</Label>
              </div>
              <p className="text-sm text-slate-600">
                Status: {switchChecked ? "Ativado" : "Desativado"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Forms Section */}
        <Card>
          <CardHeader>
            <CardTitle>Formulários</CardTitle>
            <CardDescription>
              Inputs, selects e outros componentes de formulário
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Digite seu nome" />
              </div>

              <div className="space-y-2">
                <Label>Framework</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Combobox</Label>
                <Popover open={comboOpen} onOpenChange={setComboOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={comboOpen}
                      className="w-full justify-between"
                    >
                      {comboValue
                        ? frameworks.find(
                            (framework) => framework.value === comboValue
                          )?.label
                        : "Selecione um framework..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <div className="p-4 space-y-2">
                      {frameworks.map((framework) => (
                        <div
                          key={framework.value}
                          className="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded cursor-pointer"
                          onClick={() => {
                            setComboValue(
                              framework.value === comboValue
                                ? ""
                                : framework.value
                            );
                            setComboOpen(false);
                          }}
                        >
                          <Check
                            className={`h-4 w-4 ${
                              comboValue === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          <span>{framework.label}</span>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Data</Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date
                        ? date.toLocaleDateString("pt-BR")
                        : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate: any) => {
                        setDate(newDate || new Date());
                        setCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Input id="message" placeholder="Digite sua mensagem" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Data Table</CardTitle>
            <CardDescription>
              Tabela de dados com informações dos usuários
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        ID
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Nome
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Email
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-4 align-middle">{item.id}</td>
                        <td className="p-4 align-middle font-medium">
                          {item.name}
                        </td>
                        <td className="p-4 align-middle">{item.email}</td>
                        <td className="p-4 align-middle">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              item.status === "Ativo"
                                ? "bg-green-50 text-green-700"
                                : item.status === "Inativo"
                                ? "bg-red-50 text-red-700"
                                : "bg-yellow-50 text-yellow-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollArea>

            {/* Pagination */}
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(event: any) => {
                        event.preventDefault();
                        setCurrentPage(Math.max(1, currentPage - 1));
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive={currentPage === 1}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive={currentPage === 2}>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive={currentPage === 3}>
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(event: any) => {
                        event.preventDefault();
                        setCurrentPage(Math.min(10, currentPage + 1));
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>

        {/* Modals and Overlays */}
        <Card>
          <CardHeader>
            <CardTitle>Modais e Overlays</CardTitle>
            <CardDescription>
              Dialog, Sheet e Drawer para diferentes tipos de overlay
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            {/* Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>Abrir Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Dialog Título</DialogTitle>
                  <DialogDescription>
                    Este é um exemplo de dialog. Você pode adicionar qualquer
                    conteúdo aqui.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dialog-name" className="text-right">
                      Nome
                    </Label>
                    <Input id="dialog-name" className="col-span-3" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={() => setDialogOpen(false)}>Salvar</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">Abrir Sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sheet Lateral</SheetTitle>
                  <SheetDescription>
                    Este é um sheet que desliza da lateral da tela.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="sheet-input">Exemplo de Input</Label>
                    <Input id="sheet-input" placeholder="Digite algo..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Lista de itens</Label>
                    <ScrollArea className="h-32 w-full rounded border p-4">
                      {Array.from({ length: 20 }, (_, i) => (
                        <div key={i} className="py-2 border-b last:border-b-0">
                          Item {i + 1}
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Drawer */}
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="secondary">Abrir Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Drawer Bottom</DrawerTitle>
                    <DrawerDescription>
                      Este drawer aparece na parte inferior da tela.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Configuração</Label>
                        <div className="flex items-center space-x-2">
                          <Switch id="drawer-switch" />
                          <Label htmlFor="drawer-switch">Ativar opção</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button onClick={() => setDrawerOpen(false)}>Fechar</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComponentsDemonstration;
