// Interface para configuração do componente Sidebar
interface SidebarConfig {
  containerId: string;
  toggleButtonId: string;
  menuItems: MenuItem[];
  title?: string;
  logo?: string;
}

// Interface para itens do menu
interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  isActive?: boolean;
}

// Classe do componente Sidebar
export class SidebarComponent {
  private config: SidebarConfig;
  private container: HTMLElement | null = null;
  private toggleButton: HTMLButtonElement | null = null;
  private isOpen: boolean = false;
  private activeIndicator: HTMLElement | null = null;

  constructor(config: SidebarConfig) {
    this.config = config;
    this.init();
  }

  private init(): void {
    this.container = document.getElementById(this.config.containerId);
    this.toggleButton = document.getElementById(this.config.toggleButtonId) as HTMLButtonElement;

    if (!this.container) {
      console.error(`Container com ID \'${this.config.containerId}\' não encontrado`);
      return;
    }

    this.render();
    this.bindEvents();
  }

  private render(): void {
    if (!this.container) return;

    // Gera o HTML da sidebar
    const sidebarHTML = this.generateSidebarHTML();
    this.container.innerHTML = sidebarHTML;

    // Cria o indicador azul móvel
    this.createActiveIndicator();

    // Gera o botão toggle se não existir
    if (!this.toggleButton) {
      this.createToggleButton();
    }

    // Posiciona o indicador no item ativo
    this.updateActiveIndicator();
  }

  private generateSidebarHTML(): string {
    const logo = this.config.logo || 'AutoFinance';
    const menuItemsHTML = this.config.menuItems
      .map(item => this.generateMenuItemHTML(item))
      .join('');

    return `
      <!-- Logo/Header -->
      <div class="sidebar-header flex items-center px-6 py-6 border-b border-gray-100">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-800">${logo}</span>
        </div>
      </div>
      
      <!-- Menu Items -->
      <nav class="sidebar-nav relative flex flex-col py-4">
        <!-- Indicador azul móvel -->
        <div id="active-indicator" class="absolute left-0 w-1 bg-blue-500 rounded-r-full transition-all duration-300 ease-out"></div>
        
        ${menuItemsHTML}
      </nav>
    `;
  }

  private generateMenuItemHTML(item: MenuItem): string {
    const activeClass = item.isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50';
    
    return `
      <a href="${item.href}" 
         id="${item.id}"
         data-menu-item="${item.id}"
         class="nav-link flex items-center px-6 py-3 mx-2 rounded-lg transition-all duration-200 ${activeClass}">
        <div class="w-5 h-5 mr-4 flex-shrink-0">
          ${item.icon}
        </div>
        <span class="font-medium">${item.label}</span>
      </a>
    `;
  }

  private createActiveIndicator(): void {
    this.activeIndicator = document.getElementById('active-indicator');
  }

  private createToggleButton(): void {
    const button = document.createElement('button');
    button.id = this.config.toggleButtonId;
    button.className = 'fixed top-5 left-5 z-50 p-2 bg-white rounded-lg shadow-lg cursor-pointer border border-gray-200 lg:hidden';
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    `;
    
    document.body.appendChild(button);
    this.toggleButton = button;
  }

  private bindEvents(): void {
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggle());
    }

    // Adiciona eventos aos itens do menu
    const menuLinks = this.container?.querySelectorAll('[data-menu-item]');
    menuLinks?.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const itemId = (link as HTMLElement).getAttribute('data-menu-item');
        if (itemId) {
          this.setActiveItem(itemId);
        }
      });
    });

    // Adiciona evento para fechar ao clicar fora da sidebar (apenas mobile)
    document.addEventListener('click', (event) => {
      if (this.isOpen && this.container && this.toggleButton) {
        const target = event.target as HTMLElement;
        if (!this.container.contains(target) && !this.toggleButton.contains(target)) {
          if (window.innerWidth < 1024) { // Apenas em mobile
            this.close();
          }
        }
      }
    });

    // Adiciona evento para fechar com a tecla ESC
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen && window.innerWidth < 1024) {
        this.close();
      }
    });

    // Adiciona evento para responsividade
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  private updateActiveIndicator(): void {
    if (!this.activeIndicator) return;

    const activeItem = this.container?.querySelector('.nav-link.text-blue-600');
    if (activeItem) {
      // Aguarda um frame para garantir que o DOM foi atualizado
      requestAnimationFrame(() => {
        const rect = activeItem.getBoundingClientRect();
        const navRect = this.container?.querySelector('.sidebar-nav')?.getBoundingClientRect();
        
        if (navRect && this.activeIndicator) {
          // Calcula a posição relativa ao container da navegação
          const relativeTop = rect.top - navRect.top;
          
          // Ajusta para centralizar perfeitamente com o texto
          // Considera o padding interno do item (py-3 = 12px top + 12px bottom)
          const paddingAdjustment = 0; // Sem ajuste adicional, usa a altura total do item
          
          this.activeIndicator.style.top = `${relativeTop + paddingAdjustment}px`;
          this.activeIndicator.style.height = `${rect.height}px`;
          this.activeIndicator.style.opacity = '1';
        }
      });
    } else {
      this.activeIndicator.style.opacity = '0';
    }
  }

  private handleResize(): void {
    if (window.innerWidth >= 1024) {
      // Desktop: sempre mostrar sidebar
      this.container?.classList.add('is-open');
      this.isOpen = true;
    } else {
      // Mobile: manter estado atual
      if (this.isOpen) {
        this.container?.classList.add('is-open');
      } else {
        this.container?.classList.remove('is-open');
      }
    }
  }

  // Métodos públicos para controle da sidebar
  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  public open(): void {
    if (this.container) {
      this.container.classList.add('is-open');
      this.isOpen = true;
      this.onStateChange('open');
    }
  }

  public close(): void {
    if (this.container) {
      this.container.classList.remove('is-open');
      this.isOpen = false;
      this.onStateChange('close');
    }
  }

  public isOpened(): boolean {
    return this.isOpen;
  }

  // Método para atualizar itens do menu
  public updateMenuItems(newItems: MenuItem[]): void {
    this.config.menuItems = newItems;
    this.render();
  }

  // Método para marcar um item como ativo
  public setActiveItem(itemId: string): void {
    this.config.menuItems.forEach(item => {
      item.isActive = item.id === itemId;
    });
    
    // Atualiza as classes dos elementos
    const menuLinks = this.container?.querySelectorAll('[data-menu-item]');
    menuLinks?.forEach(link => {
      const linkItemId = (link as HTMLElement).getAttribute('data-menu-item');
      if (linkItemId === itemId) {
        link.className = 'nav-link flex items-center px-6 py-3 mx-2 rounded-lg transition-all duration-200 text-blue-600 bg-blue-50';
      } else {
        link.className = 'nav-link flex items-center px-6 py-3 mx-2 rounded-lg transition-all duration-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50';
      }
    });

    // Atualiza a posição do indicador azul
    setTimeout(() => this.updateActiveIndicator(), 50);
  }

  // Callback para mudanças de estado (pode ser sobrescrito)
  protected onStateChange(state: 'open' | 'close'): void {
    console.log(`Sidebar ${state}`);
  }

  // Método para destruir o componente
  public destroy(): void {
    if (this.toggleButton && this.toggleButton.parentNode) {
      this.toggleButton.parentNode.removeChild(this.toggleButton);
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}



