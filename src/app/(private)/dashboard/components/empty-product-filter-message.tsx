const EmptyProductFilterMessage = () => {
  return (
    <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center z-10 pointer-events-auto rounded-md p-4">
      <p className="text-sm text-muted-foreground text-center">
        Selecione pelo menos 1 produto para visualizar o gráfico.
      </p>
    </div>
  );
};

export default EmptyProductFilterMessage;
