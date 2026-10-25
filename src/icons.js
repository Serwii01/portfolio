// Iconos de línea (Lucide). Solo se importan los que se usan para no inflar el bundle.
import {
  createElement,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Beer,
  Bot,
  Brain,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  Clapperboard,
  Code,
  Coffee,
  Compass,
  Download,
  Film,
  FlaskConical,
  Frame,
  Gamepad2,
  Github,
  Globe,
  GraduationCap,
  Languages,
  LayoutGrid,
  Linkedin,
  Mail,
  MessagesSquare,
  MonitorSmartphone,
  Network,
  Puzzle,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Spade,
  Sparkles,
  Sprout,
  Stethoscope,
  Trophy,
  Video,
  Workflow,
  X,
} from 'lucide';

const ICONS = {
  ArrowLeft, ArrowRight, ArrowUpRight, Beer, Bot, Brain, Briefcase, CalendarCheck, CalendarDays, Clapperboard, Code,
  Coffee, Compass, Download, Film, FlaskConical, Frame, Gamepad2, Github, Globe, GraduationCap, Languages, LayoutGrid,
  Linkedin, Mail, MessagesSquare, MonitorSmartphone, Network, Puzzle, Search, Server, ShieldCheck, Smartphone, Spade,
  Sparkles, Sprout, Stethoscope, Trophy, Video, Workflow, X,
};

const cache = {};
export function icon(name, cls = '') {
  if (!cache[name]) {
    const svg = createElement(ICONS[name]);
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.setAttribute('stroke-width', '2.25');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', 'i __CLS__');
    cache[name] = svg.outerHTML;
  }
  return cache[name].replace('__CLS__', cls);
}
