import { registerLocaleData } from '@angular/common';
import localeBa from '@angular/common/locales/sr-Latn-BA';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvProgram } from '../../interfaces/tv-program.model';
import { TvSchemaItem } from '../../interfaces/tv-schema-item.model';
import { TableComponent } from './table.component';

registerLocaleData(localeBa);

const day = (id: number, date: string, titles: string[]) => ({
  resource_type: 'tv_program_schema',
  id,
  date,
  success: true,
  schema: titles.map(
    (title) =>
      ({
        time: '10:00',
        type: '',
        title,
        replay: '',
        description: 'opis',
      }) as unknown as TvSchemaItem,
  ),
});

const program = (...days: ReturnType<typeof day>[]): TvProgram => ({
  data: days,
});

describe('TableComponent', () => {
  let fixture: ComponentFixture<TableComponent>;
  const el = () => fixture.nativeElement as HTMLElement;
  const tabs = () => [...el().querySelectorAll<HTMLElement>('.tab')];
  const activeIndex = () =>
    tabs().findIndex((t) => t.classList.contains('active'));
  const shownTitles = () =>
    [...el().querySelectorAll('.tab-content tr.cursor-pointer')].map((row) =>
      row.children[2].textContent!.trim(),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'sr-Latn-BA' }],
    });
    fixture = TestBed.createComponent(TableComponent);
    fixture.componentRef.setInput(
      'schema',
      program(day(1, '2026-11-23', ['A1', 'A2']), day(2, '2026-11-24', ['B1'])),
    );
    fixture.detectChanges();
  });

  it('shows the first day initially', () => {
    expect(tabs().length).toBe(2);
    expect(activeIndex()).toBe(0);
    expect(shownTitles()).toEqual(['A1', 'A2']);
  });

  it('switches days on tab click without mutating the input', () => {
    tabs()[1].click();
    fixture.detectChanges();
    expect(activeIndex()).toBe(1);
    expect(shownTitles()).toEqual(['B1']);
    const input = fixture.componentInstance.schema();
    expect(input.data.every((d) => d.active === undefined)).toBe(true);
  });

  it('goes back to the first day when a new schedule arrives', () => {
    tabs()[1].click();
    fixture.detectChanges();
    fixture.componentRef.setInput(
      'schema',
      program(day(3, '2026-11-30', ['C1']), day(4, '2026-12-01', ['D1'])),
    );
    fixture.detectChanges();
    expect(activeIndex()).toBe(0);
    expect(shownTitles()).toEqual(['C1']);
  });

  it('toggles a row description open and closed', () => {
    const row = el().querySelector<HTMLElement>(
      '.tab-content tr.cursor-pointer td',
    )!;
    const panel = () =>
      row.parentElement!.nextElementSibling!.querySelector<HTMLElement>(
        '.panel',
      )!;
    row.click();
    expect(panel().style.maxHeight).not.toBe('');
    row.click();
    expect(panel().style.maxHeight).toBe('');
  });
});
